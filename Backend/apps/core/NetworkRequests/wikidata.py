from django.urls import reverse_lazy
from .queries import wikidataSparqlEndpoint, allLaureate, \
    laureateDetail, allWorks
from requests import Request, Session


def setupWikidataRequest(query):
    request = Request()
    request.method = 'GET'
    request.url = wikidataSparqlEndpoint
    header = {
        'Accept': 'application/sparql-results+json',
        'user-agent': 'PhysicsNobel (federico.bertani@studio.unibo.it)'
    }
    request.headers = header
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
    name = result[0]['itemLabel']['value']
    picture = result[0].get('picture', {}).get('value')
    prizes = [reverse_lazy('prize-detail', args=[result['year']['value']]) for result in result]
    return name, picture, prizes


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
