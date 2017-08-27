from .NetworkRequests import wikidata, wikipedia, crossref, nobelprize


class Laureate(object):
    def __init__(self, name=None, picture=None, prizes=list(),
                 biography=None, works=list()):
        self.name = name
        self.picture = picture
        self.prizes = prizes
        self.biography = biography
        self.works = works

    @staticmethod
    def all():
        names, pictures, prizes = wikidata.getLaureateListData()
        return [Laureate(name, picture, prize)
                for name, picture, prize
                in zip(names, pictures, prizes)]

    @staticmethod
    def get(name):
        name, picture, prizes = wikidata.getLaureateDetailData(name)
        # get biography
        biography = wikipedia.getBiography(name)
        # get laureate articles on crossref
        works = Work.getWorks(name)
        return Laureate(name, picture, prizes, biography, works)


class Work(object):
    def __init__(self, title=None, URL=None):
        self.title = title
        self.URL = URL

    @staticmethod
    def getFromHabaneroItem(item):
        return Work(item['container-title'][0], item['URL'])

    @staticmethod
    def getWorks(name):
        data = crossref.getWorksData(name)
        works = [Work.getFromHabaneroItem(item) for item in data]
        return works

class Prize:
    def __init__(self, year, laureates=list(), motivation=None, works=list()):
        self.year = year
        self.laureates = laureates
        self.motivation = motivation
        self.works = works

    @staticmethod
    def all():
        years, laureates = wikidata.getWorksListData()
        # trasform list of list of strings to list of list of laureates
        laureates = list(map(
            lambda x: list(map(
                lambda x: Laureate(x)
                , x))
            , laureates))
        return [Prize(year, laureatesPrize)
                for year, laureatesPrize
                in zip(years, laureates)]

    @staticmethod
    def get(year):
        laureatesRaw = nobelprize.getLaureateData(year)
        laureates = [Laureate(laureate['firstname'] + " " + laureate['surname']) for laureate in laureatesRaw]
        # all motivation are equal to only pick the first one
        # truncate beginning "for" word
        motivation = laureatesRaw[0]['motivation'][5:]
        worksData = crossref.getMotivationWorksData(motivation)
        works = [Work.getFromHabaneroItem(item) for item in worksData]
        return Prize(year, laureates, motivation, works)
