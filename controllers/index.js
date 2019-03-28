'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const stats = require('../models/bookmarklist-store');

const welcome = {
  index(request, response) {
    
    
    logger.info('welcome rendering');
    
    const bookmarkCollections = stats.getAllBookmarks();
    let totalbookmarks = 0;
    for (let i in bookmarkCollections) {
    totalbookmarks = totalbookmarks + bookmarkCollections[i].bookmarks.length;
    }
    
    
    

    
   
    const viewData = {
       title: 'Welcome to the bookmarks app',
       
      totalCollections: bookmarkCollections.length,
      totalbookmarks: totalbookmarks,
    };
    response.render('index', viewData);
  
},
};

module.exports = welcome;
