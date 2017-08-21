from django.db import models
from SPARQLWrapper import SPARQLWrapper, JSON
from .queries import allLaureate, wikidataSparqlEndpoint


# Create your models here.

class Laureate():
    def __init__(self, name, picture):
        self.name = name
        self.picture = picture

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
        sparql.setQuery("""
                SELECT ?itemLabel ?picture WHERE {{
                    ?item wdt:P166 wd:Q38104.
                    ?item ?label "{0}"@en.
                    SERVICE wikibase:label {{ bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }}
                    OPTIONAL {{ ?item wdt:P18 ?picture. }}
                }}
                """.format(name))
        sparql.setReturnFormat(JSON)
        result = sparql.query().convert()['results']['bindings']
        name = result[0]['itemLabel']['value']
        picture = result[0].get('picture', {}).get('value')
        return Laureate(name, picture)
