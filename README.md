# Todoist

## About
Simple todo application built to mimic my favorite todo app "Todoist". Used only for experimental/education purposes.

<img src="http://i64.tinypic.com/ilinn9.png" />

## Technologies
* NodeJS
* ExpressJS
* AngularJS
* React/Redux
* React/Relay
* React/Native
* MongoDB
* Postgres
* GraphQL
* _TODO_ React 4
* _TODO_ Firebase
* _TODO_ Angular2
* _TODO_ RxJs
* _TODO_ CouchDB
* _TODO_ Neo4J
* _TODO_ VueJS
* _TODO_ Electron
* _TODO_ WebSockets/Subscriptions

### Requirements

You'll need to have the following installed on your operating system:

* [Node](https://nodejs.org) `>= v6.x`
* [MongoDB](https://www.mongodb.com/) `>= v3.x` *OR*
* [Postgres](https://www.postgresql.org/) `>= v9.x`
* [Redis](https://redis.io/) `>= v3.x`

### Installation

1. Install NPM dependencies in all folders:
  ```bash
  npm install
  ```
2. Install bower dependencies in angular folder:
  ```bash
  bower install
  ```
3. Configure connection to Redis and database of your choice in `server/config/env`

  3.4. In case you're using Postgres, initialize the database and execute Sequelize migrations prior to starting the server:
  ```bash
  npm run db:init
  ```
  ```bash
  npm run db:migrate
  ```

  3.5. In case you're using MongoDB, execute migrations prior to starting the server:
  ```bash
  db:mongo:migrate
  ```

4. Start the processes in both folders (install `nodemon` with `npm install -g nodemon`):

  ```bash
  npm start
  ```
5. Go to <http://localhost:9000> in your browser

  5.1 In case you change server port you need to point the frontend to a new port. That's managed in `angular/config/env`

6. Google Auth
  > TODO

7. Amazon Elastic Beanstalk and CloudFront Asset Setup
  > TODO


## License
MIT
