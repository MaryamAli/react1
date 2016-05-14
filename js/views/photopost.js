import React from 'react';

export default React.createClass({

  render() {
    return(
      <div className="image-view" id={this.props.images.id}>
        <img src={this.props.images.photo}/>
        <p>{this.props.images.caption}</p>
      </div>
    );
  }
});