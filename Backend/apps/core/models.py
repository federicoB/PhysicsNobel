from SPARQLWrapper import SPARQLWrapper, JSON

from apps.core.queries import wikidataSparqlEndpoint, allLaureate, laureateDetail


class Laureate():
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
        names = [result['itemLabel']['value'] for result in results]
        pictures = [result.get('picture', {}).get('value') for result in results]
        return [Laureate(name, picture) for name, picture in zip(names, pictures)]

    @staticmethod
    def get(name):
        sparql = SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql")
        sparql.setQuery(laureateDetail.format(name))
        sparql.setReturnFormat(JSON)
        result = sparql.query().convert()['results']['bindings']
        name = result[0]['itemLabel']['value']
        picture = result[0].get('picture', {}).get('value')
        return Laureate(name, picture)
