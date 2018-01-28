import requests
from django.core.cache import cache
from .queries import userAgent

def getLaureateData(year):
    key = "nobelPrize" + year
    data = cache.get(key, None)
    if (not data):
        baseurl = 'http://api.nobelprize.org/v1/prize.json'
        headers = {'user-agent': userAgent}
        my_atts = {}
        my_atts['year'] = year
        my_atts['category'] = "physics"
        resp = requests.get(baseurl, params=my_atts, headers=headers)
        data = resp.json()['prizes']
        data = data[0]['laureates']
        cache.set(key, data, timeout=1000000)
    return data
