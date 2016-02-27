import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root'; 
import configureStore from './store/configureStore';
import {say} from './actions/chat'

injectTapEventPlugin();

const store = configureStore()
var mySocket = io.sails.connect("http://192.168.11.23:1337")
mySocket.get('/Auth/listen', function (data) {
  console.log("superwolf", data)
});

mySocket.on('chatmessage', function (message) {
  store.dispatch(say(message.data.content))
});
ReactDOM.render(<Root store={store}/>, document.getElementById('app'));
