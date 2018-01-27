from django.urls import reverse_lazy
from requests import Request, Session
from django.core.cache import cache
import hashlib, urllib

from .queries import wikidataSparqlEndpoint, userAgent, \
    allLaureate, laureateDetail, allPrizes


def setupWikidataRequest(query):
    request = Request()
    request.method = 'GET'
    request.url = wikidataSparqlEndpoint
    headers = {
        'Accept': 'application/sparql-results+json',
        'user-agent': userAgent
    }
    request.headers = headers
    request.params = {'query': query}
    return request.prepare()


def queryWikidata(query):
    session = Session()
    preparedRequest = setupWikidataRequest(query)
    result = session.send(request=preparedRequest).json()
    return result['results']['bindings']

def getLaureateListData():
    laureates = cache.get('allLaureates')
    if (laureates):
        return laureates
    else:
        # TODO use wikipedia category for getting wikidata pages instead of using award property
        laureates = queryWikidata(allLaureate)
        cache.set('allLaureates', laureates, timeout=None)
        return laureates

def getLaureateDetailData(name):
    query = laureateDetail.format(name)
    return queryWikidata(query)


def cleanLaureateData(response):
    """
    Extract name, picture and prize from a wikidata response for a single nobel laureate

    :param response: dict with wikidata response format
    :return: name, picture, prize
    """

    name = response['itemLabel']['value']
    picture = response.get('picture', {}).get('value')
    # get prize api url from prize year
    prize = reverse_lazy('prize-detail', args=[response['year']['value']])
    return name, picture, prize

def getPrizesListData():
    results = cache.get('allPrizes')
    if (not results):
        results = queryWikidata(allPrizes)
        cache.set('allPrizes', results, timeout=None)
    years = list()
    laureates = list()
    for result in results:
        name = result['itemLabel']['value']
        year = result['year']['value']
        if year not in years:
            years.append(year)
            laureates.append([name])
        else:
            laureates[years.index(year)].append(name)
    return years, laureates


def generatePictureThumbnailUri(picture, size):
    # Mediawiki API use percent encoding apart for space that is substituted with underscore
    picture = picture.replace("%20", "_")
    # unquote percent encoding
    picture = urllib.parse.unquote(picture)
    # find last slash positions
    lastSlash = picture.rfind("/")
    # slice picture name from path
    pictureName = picture[lastSlash + 1:]
    # calculate md5 hash of picture name
    m = hashlib.md5()
    m.update(pictureName.encode('utf-8'))
    digest = m.hexdigest()
    # build final string following mediawiki thumbnail conventions
    # https://stackoverflow.com/questions/33689980/get-thumbnail-image-from-wikimedia-commons
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/{}/{}/{}/{}px-{}" \
        .format(digest[0], digest[0:2], pictureName, size, pictureName)
