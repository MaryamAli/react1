import Backbone from 'backbone';
import Photo from './photopost';

export default Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/MyPeeps',

  model: Photo,

  parse(data) {
    return data.results;
  }
});