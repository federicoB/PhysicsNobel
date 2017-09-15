from django.db import models
from django.contrib.auth.models import User

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
        if 'title' in item.keys() and len(item['title'])>0:
            return Work(item['title'][0], item['URL'])
        else:
            return None

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

# class Annotation(models.Model):
#     id = models.CharField(primary_key=True,max_length=40)
#     annotator_schema_version =
#     created = models.DateTimeField
#     updated = models.DateTimeField
#     text = models.CharField(max_length=500)
#     quote = models.CharField(max_length=500)
#     uri = models.URLField
#     user = models.ForeignKey(User,on_delete=models.CASCADE)
#     consumer = models.CharField
#
#
# class Ranges(models.Model):
#      annotation = models.ForeignKey(Annotation,on_delete=models.CASCADE)
#      start = models.CharField(max_length=50)
#      end = models.CharField(max_length=50)
#      startOffset = models.IntegerField
#      endOffset = models.IntegerField
