from django.urls import reverse_lazy
from django.contrib.auth.models import User

from rest_framework.exceptions import NotFound

from .NetworkRequests import wikidata, wikipedia, crossref, nobelprize, google


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
        """
        Queryset method to return an array of all Laureate objects

        :return: array of Laureate
        """

        results = wikidata.getLaureateListData()

        names = list()
        pictures = list()
        prizes = list()
        # for each laureate result
        for result in results:
            name, picture, prize = wikidata.cleanLaureateData(result)
            # if wikidata has laureate picture
            if (picture):
                # generate a 200px width thumbnail url for it
                picture = wikidata.generatePictureThumbnailUri(picture, 200)
            else:
                # otherwise use google search for retrieve it
                picture = google.getImage(name)
            # join elements with the same laureate
            # add a new laureate only if it's not already in the list
            if name not in names:
                names.append(name)
                pictures.append(picture)
                prizes.append([prize])
            elif (prize not in prizes[names.index(name)]):
                # TODO this condition can be removed if the GROUP BY ?itemLabel ?year worked
                # otherwise only add prize to an existing laureate in the list
                prizes[names.index(name)].append(prize)
        # create Laureate list from names, pictures and prizes list
        return [Laureate(name, picture, prize)
                for name, picture, prize
                in zip(names, pictures, prizes)]

    @staticmethod
    def get(name):
        """
        gets Laureates specifific info like biography and published works

        :param name:
        :return:
        """

        # get data from wikidata
        results = wikidata.getLaureateDetailData(name)
        if (results):
            # get name picture and prize from the first element
            name, picture, prize = wikidata.cleanLaureateData(results[0])
            # if wikidata has laureate picture
            if (picture):
                # generate a 400px width thumbnail url for it
                picture = wikidata.generatePictureThumbnailUri(picture, 200)
            else:
                # otherwise use google search for retrieve it
                picture = google.getImage(name)
            prizes = []
            # if the laureate won more than one prize (uncommon case)
            if (len(results) > 1):
                # construct prizes list from all the elements
                # discard name and picture (they are the same of the first element)
                for result in results:
                    _ , _, prize = wikidata.cleanLaureateData(result)
                    # this condition is always for grup by not working (as written also in get all laureates)
                    if (prize not in prizes): prizes.append(prize)
            else:
                # otherwise if the laureate won only one prize
                # create a prizes list with one element
                prizes = [prize]
        else:
            # if the laureate is not found raise NotFound exception
            raise NotFound("laureate not found")
        # get biography from wikipedia
        biography = wikipedia.getBiography(name)
        # get laureate articles on crossref
        works = Work.getWorks(name)
        # create Laureate object and return it
        return Laureate(name, picture, prizes, biography, works)

class Work(object):
    def __init__(self, title=None, URL=None, author=None, publishDate=None, type=None):
        self.title = title
        self.author = author
        self.publishDate = publishDate
        self.URL = URL
        self.type = type

    @staticmethod
    def getFromHabaneroItem(item):
        keys = item.keys()
        if 'title' in keys and len(item['title'])>0:
            author = None
            issued = None
            type = item.get('type',None)
            if 'author' in keys:
                author = item['author'][0]
                author = author['given']+" "+author['family']
            if 'issued' in keys:
                issued = ""
                for number in item['issued']['date-parts'][0]:
                    issued+=str(number)+" "

            return Work(item['title'][0], item['URL'],author,issued,type)
        else:
            return None

    @staticmethod
    def getWorks(name):
        """
        Return Works(journal-articles,...) with author 'name'

        :param name: srting author name
        :return: list of Works
        """

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
        years, laureates = wikidata.getPrizesListData()
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
        # TODO remove workaround
        # use wikidata laureate names because nobelprize.org sometimes have laureate different name
        # from wikidata and this cause problems
        # Prize.all() is cached so performance of this workaround is not a problem
        laureates = list(filter(lambda prize: (prize.year == year), Prize.all()))[0].laureates
        # laureates = [Laureate(laureate['firstname'] + " " + laureate['surname']) for laureate in laureatesRaw]
        # all motivation are equal to only pick the first one
        # truncate beginning "for" word
        # TODO sometimes truncate too much (see Wilhem Rontgen)
        motivation = laureatesRaw[0]['motivation'][5:-1]
        worksData = crossref.getMotivationWorksData(motivation)
        works = [Work.getFromHabaneroItem(item) for item in worksData]
        return Prize(year, laureates, motivation, works)

