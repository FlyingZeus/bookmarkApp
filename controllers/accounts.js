'use strict';
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('bookmarks', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const userpassword = userstore.getUserByPassword(request.body.password);
   if (user && user.password === request.body.password) {
      response.cookie('bookmarks', user.email,user.password);
      logger.info(`logging in ${user.email}`);
      response.redirect('/bookmarks');
    } else {
      response.redirect('/login');
      
     
    }
    
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.bookmarks;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;