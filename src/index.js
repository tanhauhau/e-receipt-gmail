import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';
import { configureStore } from './reducers/store';

const store = configureStore();

render( <AppContainer><App store={store}/></AppContainer>, document.querySelector("#app"));
