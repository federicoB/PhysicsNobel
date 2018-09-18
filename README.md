# PhysicsNobel

PhysicsNobel is the website about special people who won the nobel prize in Physics.

**link to website below**

But it's more than that, it was born for my *Web Tecnologies* course at the University of Bologna, and as that has some specialities.

First of all it doesn't have a memory for all the data its shows! Everything is fetched from others website [APIs](https://it.wikipedia.org/wiki/Application_programming_interface) and merged together to show a uniform presentation.

![services from wich PhysicsNobel takes data](https://i.imgur.com/w1IrfuV.png)

This reflect new structure of the web where knowledge is stored only in one place (more precisely in only at one URI) and is shared between services.

Indeed PhysicsNobel offer and [RESTful](https://it.wikipedia.org/wiki/Representational_State_Transfer) interface at /api/ URI to other services. 

Physics Nobel embraces semantic web (where URIs lead not only to documents) using Wikidata and quering them with [SPARQL](https://it.wikipedia.org/wiki/SPARQL) queries. 

I tried to use some cutting edge tecnologies at the time of major developing (2017) using libraries, frameworks and tools like [React](https://reactjs.org/), [Webpack](https://webpack.js.org/) and [Django](https://www.djangoproject.com/),

[Link to PhysicsNobel website](http://site1746.tw.cs.unibo.it/)

## Contributing

Contributions are well accepted! Please send a pull request if you want to contribute.
First build the fronted:
```
npm build
```
Then start the dev server in the `Backend` dir:
```
python manage.py runserver
```


## License
This project is licensed under the terms of the GNU General Public License v3.