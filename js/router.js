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
import {Spinner} from './views';

export default Backbone.Router.extend({

  routes: {
    ""              : "redirectToGallery",
    "gallery"       : "showGallery",
    "photopost/:id" : "showPost",
    "addphoto"      : "addForm",
    "editphoto/:id" : "editForm"
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

  spinner() {
    this.render(<Spinner/>);
  },

  showGallery() {
    // console.log(this);
    this.spinner();
    this.collection.fetch().then( ()=> {  
      this.render(<GalleryView 
        id={this.collection.objectId} 
        onAddClick={() => this.goto('addphoto')} 
        onClick={(id) =>this.goto('photopost/' + id)} 
        onEditClick={() => this.goto('editphoto/' + id)}
        onHomeClick={() => this.goto('')}
        images={this.collection.toJSON()}/>);
    });
  },

  showPost(id) {
    console.log(id);
    this.spinner();
    let photoPost = this.collection.get(id);

    if(photoPost) {
      console.log(photoPost);
      this.render(<PhotoView 
        images={photoPost.toJSON()}
        onEditClick={()=> this.goto('editphoto/' + id)}
        onAddClick={() => this.goto('addphoto')}
        onHomeClick={()=> this.goto('')}/>);
    } else {
      console.log(this.picId + 'added');
      photoPost = this.collection.add({objectId: id});
      photoPost.fetch().then( ()=>{
        this.render(<PhotoView 
          images={photoPost.toJSON()}
          onEditClick={()=> this.goto('editphoto/' + id)}
          onAddClick={() => this.goto('addphoto')}
          onHomeClick={()=> this.goto('')}/>);
      });
    }

  },

  addForm() {
    console.log('addphoto goes here');
    this.spinner();
    this.render(<AddPost
      images={this.collection.toJSON()}
      onAddClick={() => this.goto('addphoto')}
      onHomeClick={()=> this.goto('')}
      onSubmitClick={() => {
        let newPhoto = document.querySelector('.photo').value;
        let newCaption = document.querySelector('.caption').value;
        let newUser = document.querySelector('.user').value;
        let instaModel = new PhotoModel({
          photo   : newPhoto,
          caption : newCaption,
          user    : newUser
        });
        instaModel.save().then(() => {
          alert('Saved');
          this.goto('');
        });
      }}/>
      );

  },

  editForm(id) {
    console.log('edit form goes here');
    this.spinner();
    let getId = this.collection.get(id);
    console.log(getId);
    this.render(<EditPost
      images={this.collection.toJSON()}
      stored = {getId.toJSON()}
      onAddClick={() => this.goto('addphoto')}
      onHomeClick={()=> this.goto('')}
      onBackClick={() => this.goto('photopost/' + id)}
      onSubmitEditClick={(id, url, caption) => {
      this.saveEdit(id, url, caption);}}/>
    );
  },

  saveEdit(id, url, caption) {
    this.collection.get(id).save({
      objectId : id,
      photo : url,
      caption : caption
    }).then(() => {
      alert('Edit saved');
      this.goto('');
    });
  }      
});


