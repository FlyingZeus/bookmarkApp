'use strict';


const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const commmentstore = require('../models/comment-store.js');
const uuid = require('uuid');


const about = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
      if (loggedInUser) {
    const viewData = {
      title: 'About bookmarks app',
      username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      allcommments:commmentstore.getAllcomments()
    };
    response.render('about', viewData);
  }
      else response.redirect('/');

},
  
  addComment(request, response) {
    
    const comment = {
      id: uuid(),
      name: request.body.name,
      
        comment: request.body.comment,
     
    };
    commmentstore.addComment(comment);
    response.redirect('/about/');
  },
   
   
  
  
  
  
}; 

module.exports = about;
