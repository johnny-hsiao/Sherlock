========
Sherlock
========

A twitter analytics dashboard app. Presenting trends on articles posted on twitter

### Usage (nodejs-backend)

```
setup a database with postgres and update 'config/config.json'
npm install
node_module/.bin/sequelize db:migrate
node components/seed_accounts.json
npm start
```

### Usage (react-frontend)

```
npm install
npm start
listen on localhost:3000
```

### Instructions for app use
-add category located in sidebar dropdown
-add twitter account (enter without '@'!)
-scraping may take over a minute
-click on keyword or article in the 'word frequency' or 'article list' to update view