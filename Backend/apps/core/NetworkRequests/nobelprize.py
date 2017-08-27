import requests


def getLaureateData(year):
    baseurl = 'http://api.nobelprize.org/v1/prize.json'
    my_atts = {}
    my_atts['year'] = year
    my_atts['category'] = "physics"
    resp = requests.get(baseurl, params=my_atts)
    data = resp.json()['prizes']
    return data[0]['laureates']
