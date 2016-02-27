import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root'; 
import configureStore from './store/configureStore';

injectTapEventPlugin();

const store = configureStore()
ReactDOM.render(<Root store={store}/>, document.getElementById('app'));
