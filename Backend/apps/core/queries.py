wikidataSparqlEndpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql"
# TODO optimize queries on seraching on instance and sublass of humans
allLaureate = """
        SELECT ?itemLabel ?picture WHERE {
  ?item wdt:P166 wd:Q38104.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  OPTIONAL { ?item wdt:P18 ?picture. }
}
        """
