from django.db import models
from SPARQLWrapper import SPARQLWrapper, JSON


# Create your models here.

class Laureate():
    def __init__(self, name):
        self.name = name

    @staticmethod
    def all():
        # TODO use wikipedia category for getting wikidata pages instead of using award property
        sparql = SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql")
        sparql.setQuery("""
        SELECT ?itemLabel WHERE {
            ?item wdt:P166 wd:Q38104.
            SERVICE wikibase:label { 
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
                }
        }
        """)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()['results']['bindings']
        names = [result['itemLabel']['value'] for result in results]
        return [Laureate(name) for name in names]
