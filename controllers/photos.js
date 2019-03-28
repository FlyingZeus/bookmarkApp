'use strict';


const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/picture-store.js');



const photos = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
      if (loggedInUser) {
    const viewData = {
      title: 'Your Photo Album',
      username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      album: pictureStore.getAlbum(loggedInUser.id),
    };
    response.render('photos', viewData);
  }
      else response.redirect('/');

},
  
  
   uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/photos');
    });
  },
  
  deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/photos');
  },

  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/photos');
  },
  
  
}; 

module.exports = photos;
