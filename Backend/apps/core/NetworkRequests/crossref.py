from habanero import Crossref


def getWorksData(name):
    cr = Crossref()
    result = cr.works(
        query_author=name,
        limit=6)
    return result['message']['items']


def getMotivationWorksData(motivation):
    cr = Crossref()
    result = cr.works(
        query=motivation,
        limit=6)
    return result['message']['items']
