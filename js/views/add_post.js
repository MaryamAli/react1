import React from 'react';

export default React.createClass({

  goHomeView() {
    console.log('home button clicked');
    this.props.onHomeClick();
  },

  addFormView() {
    console.log('add button clicked');
    this.props.onAddClick();
  },

  addNewPost() {
    console.log('new post from add new post');
    this.props.onSubmitClick();
  },

  render() {
    console.log('add form');
    return(
      <div>
        <div className="header">
          <img src="http://lorempixel.com/400/200/sports/1/Dummy-Text/"/>
          <button onClick={() => this.goHomeView()}>Home</button>
          <button onClick={() => this.addFormView()}>Add</button>
        </div>
        <div className="new-post">
          <form>
            <label>Image URL: <input type="text" className="photo"/></label>
            <label>Caption: <input type="text" className="caption"/></label>
            <button onClick={() => this.addNewPost()}>Submit</button>
          </form>
        </div>
      </div>


      );
  }
});