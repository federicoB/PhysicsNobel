wikidataSparqlEndpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql"
# TODO optimize queries on seraching on instance and sublass of humans
allLaureate = """
        SELECT ?itemLabel (YEAR(?date) as ?year) ?picture WHERE {
            ?item p:P166 ?statement.
            ?statement ps:P166 wd:Q38104.
            ?statement pq:P585 ?date
            SERVICE wikibase:label { 
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
                 }
            OPTIONAL { ?item wdt:P18 ?picture. }
        }
        """
# TODO find alternative to use group by
laureateDetail = """
        SELECT ?itemLabel (YEAR(?date) as ?year) ?picture WHERE {{
            ?item ?label "{0}"@en.
            ?item p:P166 ?statement.
            ?statement ps:P166 wd:Q38104.
            ?statement pq:P585 ?date
            SERVICE wikibase:label {{
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
                }}
            OPTIONAL {{
                ?item wdt:P18 ?picture. 
            }}         
        }}
        GROUP BY ?date ?itemLabel ?picture
        """
