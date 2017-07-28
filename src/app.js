import React from 'react';
import { Provider } from 'react-redux';

import Header from './components/header';
import Footer from './components/footer';
import Body from './components/body';
import GoogleApi from './components/googleApi';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <Header />
        <Body />
        <Footer />
        <GoogleApi />
      </div>
    </MuiThemeProvider>
  </Provider>
)
