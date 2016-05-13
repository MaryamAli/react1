import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';

import {Gallery as GalleryCollection} from './resources';
import {Photo as PhotoModel} from './resources';

import {Gallery as GalleryView} from './views';

export default Backbone.Router.extend({

  routes: {
    ""        : "redirectToGallery",
    "gallery" : "showGallery"
  },

  initialize(appElement) {
    this.el = appElement;
    this.collection = new GalleryCollection();
  },

  render(component) {
    ReactDom.render(component, this.el);

  },

  start() {
    Backbone.history.start();
    return this;
  },
  redirectToGallery() {
    this.navigate('gallery', {replace: true, trigger: true});
  },

  showGallery() {
    console.log(this);
    this.collection.fetch().then( ()=> {
      this.render(<GalleryView images={this.collection.toJSON()}/>);

    });
  }
});