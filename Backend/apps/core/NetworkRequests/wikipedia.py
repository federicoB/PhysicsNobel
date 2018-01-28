import requests, re
from bs4 import BeautifulSoup, Tag
from django.core.cache import cache
from urllib.parse import quote
from .queries import userAgent


def getBiography(name):
    key = "wikibiography" + quote(name)
    data = cache.get(key, None)
    if (not data):
        baseurl = 'https://en.wikipedia.org/w/api.php'
        headers = {'user-agent': userAgent}
        my_atts = {}
        my_atts['action'] = 'parse'
        my_atts['format'] = 'json'
        my_atts['disabletoc'] = 1
        my_atts['disableeditsection'] = 1
        my_atts['redirects'] = 1
        my_atts['page'] = name
        resp = requests.get(baseurl, params=my_atts, headers=headers)
        data = resp.json()
        cache.set(key, data, timeout=1000000)
    biography = next(iter(data['parse']['text'].values()))
    soup = BeautifulSoup(biography, "html.parser")
    wikipediaHTMLCleanup(soup)
    changeLinksToInternal(soup)
    # TODO remove References and External Links
    return str(soup)


def wikipediaHTMLCleanup(soup):
    tags_to_remove = []
    # removes metadata warnings that usualy appear on top of wikipage
    tags_to_remove.extend(soup.find_all('table', {'class': 'metadata'}))
    # removes infobox
    tags_to_remove.extend(soup.find_all('table', {'class': 'infobox'}))
    # removes notes
    tags_to_remove.extend(soup.find_all('div', {'class': 'hatnote'}))
    # removes references
    tags_to_remove.extend(soup.find_all('sup', {'class': 'reference'}))
    sections_to_remove = ['Bibliography', 'See also', 'References', 'External links', 'Notes','Publications']
    # foreach section to remove
    for section in sections_to_remove:
        # find and h2 with as text the name
        section_to_remove = soup.find('h2', string=section)
        if (section_to_remove != None):
            # remove every next tag untilf another h2 is found
            tags_to_remove.append(section_to_remove)
            next = getNextTag(section_to_remove)
            # if the next tag is not None (reached end of document) and is not an h2 tag (another section)
            while (next != None and next.name != 'h2'):
                # add tag to the list to remove
                tags_to_remove.append(next)
                # get next tag
                next = getNextTag(next)
    for tag in tags_to_remove:
        if tag != None:
            # remove the tag and all its children from the document
            tag.decompose()


def getNextTag(tag):
    """
    get the sibiling tag. Skip strings and others non tags objects.

    :param tag: BeautifulSoup Tag type. The tag to know the next
    :return: BeautifulSoup Tag type. None if the end of document is reached.
    """
    next = tag.next_sibling
    while (next != None and type(next) != Tag):
        next = next.next_sibling
    return next


def changeLinksToInternal(soup):
    for a in soup.find_all('a', href=re.compile("^/wiki/.*$")):
        # get part of string after /wiki/
        pageName = a.attrs['href'].split('/wiki/')[1]
        # concat to /pages/ to create an internal link
        a.attrs['href'] = "/pages/" + pageName
