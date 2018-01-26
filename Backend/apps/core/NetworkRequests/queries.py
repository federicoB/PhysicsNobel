
wikidataSparqlEndpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql"

userAgent = 'PhysicsNobel (federico.bertani@studio.unibo.it)'

# TODO optimize queries on searching on instance and sublass of humans
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

allWorks = """
        SELECT (YEAR(?date) as ?year) ?itemLabel WHERE {
            ?item p:P166 ?statement.
            ?statement ps:P166 wd:Q38104.
            ?statement pq:P585 ?date
            SERVICE wikibase:label { 
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
                 }
        }
        """
