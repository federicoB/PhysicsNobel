from django.urls import reverse_lazy
from requests import Request, Session
from rest_framework.exceptions import NotFound
import hashlib, urllib

from .queries import wikidataSparqlEndpoint, userAgent, \
    allLaureate, laureateDetail, allWorks


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
    # TODO use wikipedia category for getting wikidata pages instead of using award property
    results = queryWikidata(allLaureate)
    # join prizes with the same laureate
    names = list()
    pictures = list()
    prizes = list()
    for result in results:
        name = result['itemLabel']['value']
        picture = result.get('picture', {}).get('value')
        # call generate picture thumbnail url with width 200px
        if (picture): picture = generatePictureThumbnailUri(picture, 200)
        prize = reverse_lazy('prize-detail', args=[result['year']['value']])
        if name not in names:
            names.append(name)
            pictures.append(picture)
            prizes.append([prize])
        else:
            prizes[names.index(name)].append(prize)
    return names, pictures, prizes


def getLaureateDetailData(name):
    query = laureateDetail.format(name)
    result = queryWikidata(query)
    if (result):
        name = result[0]['itemLabel']['value']
        picture = result[0].get('picture', {}).get('value')
        # call generate picture thumbnail url with width 400px
        if (picture): picture = generatePictureThumbnailUri(picture, 400)
        prizes = [reverse_lazy('prize-detail', args=[result['year']['value']]) for result in result]
        return name, picture, prizes
    else:
        raise NotFound("laureate not found")


def getWorksListData():
    results = queryWikidata(allWorks)
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
