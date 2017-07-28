import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

class GoogleAuthButton extends React.Component {

  logout () {
    gapi.auth2.getAuthInstance().signOut();
  }

  login () {
    gapi.auth2.getAuthInstance().signIn();
  }

  render () {
    const { isReady, loggedIn } = this.props
    if (!isReady) return null;
    return (
      <RaisedButton
        primary
        label={ loggedIn ? 'Logout' : 'Connect to Google' }
        onTouchTap={() => loggedIn ? this.logout() : this.login()}
      />
    );
  }
}
export default connect(
  state => ({ isReady: state.googleApi.ready, loggedIn: state.googleApi.loggedIn })
) (GoogleAuthButton)
