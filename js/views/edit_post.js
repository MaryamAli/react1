import React from 'react';

export default React.createClass({

  getInitialState() {
    return({
      objectId : this.props.stored.objectId,
      photo : this.props.stored.photo,
      caption : this.props.stored.caption
    });
  },

  setId(event){
    let newId = event.currentTarget.value;
    this.setState({objectId : newId});
  },

  updatePhoto(event) {
    let newPhoto = event.currentTarget.value;
    this.setState({photo: newPhoto});
  },

  updateCaption(event) {
    let newCaption = event.currentTarget.value;
    this.setState({caption : newCaption});
  },

  goHomeView() {
    console.log('home button clicked');
    this.props.onHomeClick();
  },

  addFormView() {
    console.log('add button clicked');
    this.props.onAddClick();
  },

  addChanges(event) {
    console.log('edits added');
    even.preventDefault();
    this.props.onSubmitEditClick(
      this.state.objectId,
      this.state.photo,
      this.state.caption
      );
  },

  render() {
    console.log('add form');
    return(
      <div>
        <div className="header">
          <img src="http://lorempixel.com/400/200/sports/Dummy-Text/"/>
          <button onClick={() => this.goHomeView()}>Home</button>
          <button onClick={() => this.goBackView()}>Back</button>
          //EXTRA BUTTON 
          <button onClick={() => this.editFormView()}>Edit</button>
          <button onClick={this.addChanges}>This is the add button</button>
        </div>
        <div className="edit-post">
          <h4 className="header">Edit/Change</h4>
          <form>
            <label>Id: <input onChange = {this.setId} type="text" className="id"  value={this.state.objectId}/></label>
            <label>Image URL: <input onChange={this.updatePhoto} type="text" className="photo" value={this.state.photo}/></label>
            <label>Caption: <input onChange={this.updateCaption} type="text" className="caption" value={this.state.caption}/></label>
            <button onClick={this.addChanges}>Submit Edit this is the add button</button>
          </form>
        </div>
      </div>
      );
  }
});