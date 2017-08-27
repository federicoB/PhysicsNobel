import requests

from .queries import userAgent

def getLaureateData(year):
    baseurl = 'http://api.nobelprize.org/v1/prize.json'
    headers = {'user-agent': userAgent}
    my_atts = {}
    my_atts['year'] = year
    my_atts['category'] = "physics"
    resp = requests.get(baseurl, params=my_atts, headers=headers)
    data = resp.json()['prizes']
    return data[0]['laureates']
