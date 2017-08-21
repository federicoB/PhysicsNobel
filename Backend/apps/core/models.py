from SPARQLWrapper import SPARQLWrapper, JSON
import requests
from apps.core.queries import wikidataSparqlEndpoint, allLaureate, laureateDetail


class Laureate(object):
    def __init__(self, name=None, picture=None, prizes=[], biography=None):
        self.name = name
        self.picture = picture
        self.prizes = prizes
        self.biography = biography

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
            prize = result['year']['value']
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
        prizes = [result['year']['value'] for result in result]
        # get biography
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
        return Laureate(name, picture, prizes, biography)
