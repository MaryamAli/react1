import $ from 'jquery';
const APP_ID = '';
const API_KEY = '';

$.ajaxSetup({
  headers: {
    'X-Parse-Application-Id': APP_ID,
    'X-Parse-REST-API-Key': API_KEY
  }
});