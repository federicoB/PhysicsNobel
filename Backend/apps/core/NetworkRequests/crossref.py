from habanero import Crossref
from urllib.parse import quote
from django.core.cache import cache

def getWorksData(name):
    key = "works" + quote(name)
    works = cache.get(key, None)
    if (not works):
        cr = Crossref()
        result = cr.works(
            query_author=name,
            limit=6)
        works = result['message']['items']
        cache.set(key, works, timeout=1000000)
    return works

def getMotivationWorksData(motivation):
    key = "worksMotivation" + quote(motivation)
    works = cache.get(key, None)
    if (not works):
        cr = Crossref()
        result = cr.works(
            query=motivation,
            limit=6)
        works = result['message']['items']
        cache.set(key, works, timeout=1000000)
    return works
