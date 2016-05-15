import React from 'react';

export default React.createClass({

  goHomeView() {
    console.log('home button clicked');
    this.props.onHomeClick();
  },

  editFormView() {
    console.log('edit button clicked');
    this.props.onEditClick();
  },

  addFormView() {
    console.log('button click working');
    this.props.onAddClick();
  },

  render() {
    return(
      <div>
        <div className="header">
            <img src="http://lorempixel.com/400/200/"/>
            <button onClick={() => this.goHomeView()}>Home</button>
            <button onClick={() =>this.addFormView()}>Add</button>
            <button onClick={() => this.editFormView()}>Edit</button>
        </div>
        <div className="image-view" id={this.props.image.id}>
          <img src={this.props.images.photo}/>
          <p>{this.props.images.caption}</p>
        </div>
      </div>
    );
  }
});