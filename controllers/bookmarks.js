'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');



const bookmarks = {
  index(request, response) {
    logger.info('bookmarks rendering');
     const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Bookmark List',
      bookmarklist:  bookmarklistStore.getUserbookmarks(loggedInUser.id),
      username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    
    };
    logger.info('about to render', bookmarklistStore.getAllBookmarks());
    response.render('bookmarks', viewData);
  }
     else response.redirect('/');
  },
  
    deleteBookmarkList(request, response) {
    const bookmarkId = request.params.id;
    logger.debug(`Deleting Bookmark ${bookmarkId}`);
    
    bookmarklistStore.removebookmarkList(bookmarkId);
    response.redirect('/bookmarks/');
  },
  
  addbookmarkGroup(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    
    const newGroup = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      color: request.body.color,
      bookmarks: [],
    };
    bookmarklistStore.addbookmarkGroup(newGroup);
    response.redirect('/bookmarks');
  },
  
  
   
  
};

module.exports = bookmarks;