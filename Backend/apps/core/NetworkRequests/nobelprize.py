import requests

from .queries import userAgent

def getLaureateData(year):
    baseurl = 'http://api.nobelprize.org/v1/prize.json'
    header = {'user-agent': userAgent}
    my_atts = {}
    my_atts['year'] = year
    my_atts['category'] = "physics"
    resp = requests.get(baseurl, params=my_atts, header=header)
    data = resp.json()['prizes']
    return data[0]['laureates']
