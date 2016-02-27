import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root'; 
import configureStore from './store/configureStore';
import {say, receiveMessage, loadMessages} from './actions/chat'

injectTapEventPlugin();

const store = configureStore()
var mySocket = window.mySocket = io.sails.connect("http://192.168.11.23:1337")
mySocket.get('/Auth/listen', function (data) {
  mySocket.get("/ChatMessage?sort=id desc&limit=10", function(messages){
    store.dispatch(loadMessages(messages))
  })
});

mySocket.on('chatmessage', function (message) {
  store.dispatch(receiveMessage(message.data))
});
ReactDOM.render(<Root store={store}/>, document.getElementById('app'));
