
'use strict';

const express = require('express');
const router = express.Router();

const index = require('./controllers/index');
const bookmarks = require('./controllers/bookmarks.js');
const about = require('./controllers/about.js');
const bookmarkList = require('./controllers/bookmarkList.js');
const accounts = require ('./controllers/accounts.js');
const photos = require('./controllers/photos.js');


router.get('/', index.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/photos', photos.index);
router.get('/', index.index);
router.get('/bookmarks', bookmarks.index);
router.get('/about', about.index);
router.get('/bookmarkList/:id', bookmarkList.index);
router.get('/bookmarkList/:id/deleteBookmark/:bookmarksid', bookmarkList.deleteBookmark);
router.get('/bookmarks/deletebookmarklist/:id',bookmarks.deleteBookmarkList);
router.post('/bookmarkList/:id/addBookmark',bookmarkList.addBookmark);
router.post('/bookmarks/addbookmarkGroup', bookmarks.addbookmarkGroup);

router.get('/photos/deleteallpictures', photos.deleteAllPictures);
router.get('/photos/deletepicture', photos.deletePicture);


router.post('/photos/uploadpicture', photos.uploadPicture);
router.post('/about/addComment', about.addComment);


module.exports = router;
