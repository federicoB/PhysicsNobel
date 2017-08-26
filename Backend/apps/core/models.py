import requests
from SPARQLWrapper import SPARQLWrapper, JSON
from django.urls import reverse_lazy
from habanero import Crossref

from apps.core.queries import wikidataSparqlEndpoint, \
    allLaureate, laureateDetail, allWorks


class Laureate(object):
    def __init__(self, name=None, picture=None, prizes=list(),
                 biography=None, works=list()):
        self.name = name
        self.picture = picture
        self.prizes = prizes
        self.biography = biography
        self.works = works

    @staticmethod
    def all():
        # TODO use wikipedia category for getting wikidata pages instead of using award property
        sparql = SPARQLWrapper(wikidataSparqlEndpoint)
        sparql.setQuery(allLaureate)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()['results']['bindings']
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
        return [Laureate(name, picture, prize)
                for name, picture, prize
                in zip(names, pictures, prizes)]

    @staticmethod
    def get(name):
        sparql = SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql")
        sparql.setQuery(laureateDetail.format(name))
        sparql.setReturnFormat(JSON)
        result = sparql.query().convert()['results']['bindings']
        name = result[0]['itemLabel']['value']
        picture = result[0].get('picture', {}).get('value')
        prizes = [reverse_lazy('prize-detail', args=[result['year']['value']]) for result in result]
        # get biography
        # TODO add user agent
        baseurl = 'https://en.wikipedia.org/w/api.php'
        my_atts = {}
        my_atts['action'] = 'query'
        my_atts['prop'] = 'extracts'
        my_atts['explaintext'] = True
        my_atts['format'] = 'json'
        my_atts['titles'] = name
        resp = requests.get(baseurl, params=my_atts)
        data = resp.json()
        biography = next(iter(data['query']['pages'].values()))['extract']
        # TODO remove References and External Links
        # get laureate articles on crossref
        cr = Crossref()
        result = cr.works(
            query_author=name,
            limit=6)
        works = [Work.getFromHabaneroItem(item) for item in result['message']['items']]
        return Laureate(name, picture, prizes, biography, works)


class Work(object):
    def __init__(self, title=None, URL=None):
        self.title = title
        self.URL = URL

    @staticmethod
    def getFromHabaneroItem(item):
        return Work(item['container-title'][0], item['URL'])


class Prize:
    def __init__(self, year, laureates=list(), motivation=None, works=list()):
        self.year = year
        self.laureates = laureates
        self.motivation = motivation
        self.works = works

    @staticmethod
    def all():
        sparql = SPARQLWrapper(wikidataSparqlEndpoint)
        sparql.setQuery(allWorks)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()['results']['bindings']
        years = list()
        laureates = list()
        for result in results:
            name = result['itemLabel']['value']
            year = result['year']['value']
            if year not in years:
                years.append(year)
                laureates.append([Laureate(name)])
            else:
                laureates[years.index(year)].append(Laureate(name))
        return [Prize(year, laureatesPrize)
                for year, laureatesPrize
                in zip(years, laureates)]

    @staticmethod
    def get(year):
        baseurl = 'http://api.nobelprize.org/v1/prize.json'
        my_atts = {}
        my_atts['year'] = year
        my_atts['category'] = "physics"
        resp = requests.get(baseurl, params=my_atts)
        data = resp.json()['prizes']
        laureatesRaw = data[0]['laureates']
        laureates = [Laureate(laureate['firstname'] + " " + laureate['surname']) for laureate in laureatesRaw]
        motivation = laureatesRaw[0]['motivation'][5:]
        cr = Crossref()
        result = cr.works(
            query=motivation,
            limit=6)
        works = [Work.getFromHabaneroItem(item) for item in result['message']['items']]
        return Prize(year, laureates, motivation, works)
