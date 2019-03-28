'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const bookmarkList = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const bookmarklistId= request.params.id;
    logger.debug('Bookmark id = ', bookmarklistId);
     if (loggedInUser) {
    const viewData = {
    title: 'Bookmark list',
    allbookmarks: bookmarklistStore.getBookmarkList(bookmarklistId),
    username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('bookmarkList', viewData);
    
    
    
  }
      else response.redirect('/');
  },
  
    deleteBookmark(request, response) {
    const bookmarklistId = request.params.id;
    const bookmarkId = request.params.bookmarksid;
       
      
    logger.debug(`Deleting Bookmark ${bookmarkId} from bookmark list ${bookmarklistId}`);
    
    bookmarklistStore.removeBookmark(bookmarklistId, bookmarkId);
    response.redirect('/bookmarkList/' + bookmarklistId);
  },
  
  addBookmark(request, response) {
    const bookmarklistId = request.params.id;
    const bookmarklist = bookmarklistStore.getBookmarkList(bookmarklistId);
    const newBookmark = {
      id: uuid(),
      title: request.body.title,
      link: request.body.link,
      summary: request.body.summary,
    };
    bookmarklistStore.addBookmark(bookmarklistId, newBookmark);
    response.redirect('/bookmarkList/' + bookmarklistId);
  },
  
  
    
};


module.exports = bookmarkList;