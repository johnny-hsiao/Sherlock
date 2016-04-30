========
Sherlock
========

A twitter analytics dashboard app. Presenting trends on articles posted on twitter

### Usage (nodejs-backend)

```
$ setup a database with postgres and update 'config/config.json'
$ npm install
$ node_module/.bin/sequelize db:migrate
$ node components/seed_accounts.json
$ npm start
```

### Usage (react-frontend)

```
$ npm install
$ npm start
$ listen on localhost:3000
```

### Instructions for app use
-add category located in sidebar dropdown
-add twitter account (enter without '@'!)
-scraping may take over a minute
-click on keyword or article in the 'word frequency' or 'article list' to update view

### Screenshots

![alt tag](http://i1156.photobucket.com/albums/p573/johnnyhsiao/Screen%20Shot%202016-04-29%20at%207.01.27%20PM_zps2i5sjrru.png "Sherlock: Dashboard view part 1")
![alt tag](http://i1156.photobucket.com/albums/p573/johnnyhsiao/Screen%20Shot%202016-04-29%20at%207.02.08%20PM_zpsw7nbj6il.png "Sherlock: Dashboard view part 2")