from SPARQLWrapper import SPARQLWrapper, JSON
from django.urls import reverse_lazy
from .queries import wikidataSparqlEndpoint, allLaureate, \
    laureateDetail, allWorks


def getLaureateListData():
    # TODO use wikipedia category for getting wikidata pages instead of using award property
    sparql = setupWikidataRequest()
    sparql.setQuery(allLaureate)
    results = sparql.query().convert()['results']['bindings']
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


def setupWikidataRequest():
    sparql = SPARQLWrapper(wikidataSparqlEndpoint)
    sparql.setReturnFormat(JSON)
    return sparql


def getLaureateDetailData(name):
    sparql = setupWikidataRequest()
    query = laureateDetail.format(name)
    sparql.setQuery(query)
    result = sparql.query().convert()['results']['bindings']
    name = result[0]['itemLabel']['value']
    picture = result[0].get('picture', {}).get('value')
    prizes = [reverse_lazy('prize-detail', args=[result['year']['value']]) for result in result]
    return name, picture, prizes


def getWorksListData():
    sparql = setupWikidataRequest()
    sparql.setQuery(allWorks)
    results = sparql.query().convert()['results']['bindings']
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
