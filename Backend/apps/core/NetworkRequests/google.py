from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from urllib.parse import quote
from django.core.cache import cache
import json


def getFromScrape(laureateName):
    """
        Web scrape google image search for get an image of a laureate

        :param laureateName: string
        :return: string link to an image of the laureate
        """

    query = laureateName.split()
    query = '+'.join(query)
    # tbm=isch sets search type to images
    # tbs=itp:face sets search to faces
    # TODO add image size parameter
    url = "https://www.google.com/search?q=" + query + "&tbs=itp:face&tbm=isch"
    header = {
        'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"}
    # TODO use lxml’s HTML parser
    soup = BeautifulSoup(urlopen(Request(url, headers=header)), 'html.parser')
    # get metadata contained in <div class="rg_meta">
    a = soup.find("div", {"class": "rg_meta"})
    # the metadata is saved as json, decode it
    link = json.loads(a.text)["ou"]
    return link

def getImage(laureateName):
    key = 'googleImageSearch-' + quote(laureateName)
    link = cache.get(key)
    if (link):
        return link
    else:
        link = getFromScrape(laureateName)
        cache.set(key, link, timeout=None)
        return link
