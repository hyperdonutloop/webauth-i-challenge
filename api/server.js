const express = require('express');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js')
const knex = require('../data/dbConfig.js');

const server = express();

const sessionConfiguration = {
  name: 'cookie crisp', // default would be sid
  secret: 'keep it secret, keep it safe', // used for encryption, (must be an environment variable)
  saveUninitialized: true,
  resave: false,
  store: new KnexSessionStore({
    knex, 
    createTable: true,
    clearInterval: 1000 * 60 * 10, // clears the expired session
    sidFieldName: 'sid',
    tablename: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }

}

configureMiddleware(server);

server.use(sessions(sessionConfiguration)); // adds a req.session object

server.use('/api', apiRouter);

module.exports = server;