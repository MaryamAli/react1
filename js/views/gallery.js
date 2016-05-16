import React from 'react';

export default React.createClass({

  viewPhoto(id) {
    this.props.onClick(id);
  },

  goHomeView() {
    console.log('home button clicked');
    this.props.onHomeClick();
  },


  addFormView() {
    console.log('button click working');
    this.props.onAddClick();
  },

  processData(data) {
    return (
        <div key={data.objectId}>
          <img id={data.objectId} onClick={() => this.viewPhoto(data.objectId)} src={data.photo}/>
        </div>
      );
  },

  render() {
    return (
        // <div className="gallery-images">{this.props.images.map(this.processData)}</div>
        <div>
          <div id={this.props.images.id} className="header">
            <img src="http://lorempixel.com/400/200/"/>
            <button onClick={() => this.goHomeView()}>Home</button>
            <button onClick={() =>this.addFormView()}>Add</button>
          </div>
          <div className="gallery-images">{this.props.images.map(this.processData)}</div>
        </div>

      );
  }
});