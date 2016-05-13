import React from 'react';

export default React.createClass({

  processData(data) {
    return (
        <div key={data.objectId}>
          <img src={data.photo}/>
        </div>
      );
  },

  render() {
    return (
        <div className="gallery-images">{this.props.images.map(this.processData)}</div>
      );
  }
});