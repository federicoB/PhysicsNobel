import requests

from .queries import userAgent


def getBiography(name):
    # TODO add user agent
    baseurl = 'https://en.wikipedia.org/w/api.php'
    headers = {'user-agent': userAgent}
    my_atts = {}
    my_atts['action'] = 'query'
    my_atts['prop'] = 'extracts'
    my_atts['explaintext'] = True
    my_atts['format'] = 'json'
    my_atts['titles'] = name
    resp = requests.get(baseurl, params=my_atts, headers=headers)
    data = resp.json()
    biography = next(iter(data['query']['pages'].values()))['extract']
    # TODO remove References and External Links
    return biography
