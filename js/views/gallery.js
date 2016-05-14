import React from 'react';

export default React.createClass({

  viewPhoto(id) {
    this.props.onClick(id);
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
        <div className="gallery-images">{this.props.images.map(this.processData)}</div>
      );
  }
});