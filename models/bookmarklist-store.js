'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarklistStore = {

 store: new JsonStore('./models/bookmarklist-store.json', { bookmarkCollection: [] }),
  collection: 'bookmarkCollection',

  getAllBookmarks() {
    return this.store.findAll(this.collection);
  },

   getBookmarkList(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  removeBookmark(id, bookmarkId) {
  const bookmarklist = this.getBookmarkList(id);
  const songs = bookmarklist.bookmarks;  
     _.remove(songs, { id: bookmarkId});
    // remove the song with id songId from the playlist
  },
  
  removebookmarkList(id) {
  const playlist = this.getBookmarkList(id);
  this.store.remove(this.collection, playlist);
},
  
  
  addBookmark(id, bookmarkId) {
    const bookmarklist = this.getBookmarkList(id);
    bookmarklist.bookmarks.push(bookmarkId);
  },
  
  
  
  addbookmarkGroup(newgroup) {
  this.store.add(this.collection, newgroup);
},
  
  getUserbookmarks(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  
  removeAllBoomarks() {
    this.store.removeAll(this.collection);
  },
  
}
module.exports = bookmarklistStore;