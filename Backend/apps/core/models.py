from django.db import models
from SPARQLWrapper import SPARQLWrapper, JSON


# Create your models here.

class Laureate:
    def __init__(self, name, surname):
        self.name = name
        self.surname = surname

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
        return sparql.query().convert()
