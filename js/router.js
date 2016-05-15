import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {Gallery as GalleryCollection} from './resources';
import {Photo as PhotoModel} from './resources';

import {Gallery as GalleryView} from './views';
import {PhotoPost as PhotoView} from './views';

import {AddPost} from './views';
import {EditPost} from './views';

export default Backbone.Router.extend({

  routes: {
    ""              : "redirectToGallery",
    "gallery"       : "showGallery",
    "photopost/:id" : "showPost",
    "addphoto"      : "addForm",
    "editphoto"     : "editForm"
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

  goto(route) {
    this.navigate(route, {trigger: true});
  },

  redirectToGallery() {
    this.navigate('gallery', {replace: true, trigger: true});
  },

  showGallery() {
    // console.log(this);
    this.collection.fetch().then( ()=> {
      this.render(<GalleryView 
        id={this.collection.objectId} 
        onAddClick={() => this.goto('addphoto')} 
        onClick={(id) =>this.goto('photopost/' + id)} 
        onEditClick={() => this.goto('editphoto')}
        onHomeClick={() => this.goto('')}
        images={this.collection.toJSON()}/>);
    });
  },

  showPost(id) {
    console.log(id);
    let photoPost = this.collection.get(id);

    if(photoPost) {
      console.log(photoPost);
      this.render(<PhotoView 
        images={photoPost.toJSON()}
        onEditClick={()=> this.goto('editphoto')}
        onAddClick={() => this.goto('addphoto')}
        onHomeClick={()=> this.goto('')}/>);
    } else {
      console.log(this.picId + 'added');
      photoPost = this.collection.add(id);
      photoPost.fetch().then( ()=>{
        this.render(<PhotoView 
          images={photoPost.toJSON()}
          onEditClick={()=> this.goto('editphoto')}
          onAddClick={() => this.goto('addphoto')}
          onHomeClick={()=> this.goto('')}/>);
      });
    }

  },

  addForm() {
    console.log('addphoto goes here');
    this.render(<AddPost
      images={this.collection.toJSON()}
      onEditClick={()=> this.goto('editphoto')}
      onAddClick={() => this.goto('addphoto')}
      onHomeClick={()=> this.goto('')}/>);

  },

  editForm() {
    console.log('edit form goes here');
    this.render(<EditPost
      images={this.collection.toJSON()}
      onEditClick={()=> this.goto('editphoto')}
      onAddClick={() => this.goto('addphoto')}
      onHomeClick={()=> this.goto('')}/>);
  }
});

