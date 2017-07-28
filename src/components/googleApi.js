import React from 'react';
import { connect } from 'react-redux'
import { googleApiReady, setLoggedInStatus } from '../reducers/googleApi'

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
const CLIENT_ID = '59682600265-4tv64aaseb9uj7cc3d8nc90ifqae8u4a.apps.googleusercontent.com';

class GoogleApi extends React.Component {

  onScriptLoad () {
    gapi.load('client:auth2', () => this.initClient());
  }

  initClient () {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(() => {
      this.props.ready()
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => this.updateSigninStatus(isSignedIn));

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  updateSigninStatus (status) {
    this.props.setLoggedInStatus(status)
  }

  componentWillMount () {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;
    script.onload = this.onScriptLoad.bind(this);
    script.onreadystatechange = function () { if (this.readyState === 'complete') { this.onLoad(); }}
    document.body.appendChild(script);
  }

  render() {
    const { ready, loggedIn } = this.props
    return <div>
      <p>ready: {ready ? 'true' : 'false'}, loggedIn: { loggedIn ? 'true' : 'false' }</p>
    </div>
  }
}

const ConnectedGoogleApi = connect(
  state => ({ ready: state.googleApi.ready, loggedIn: state.googleApi.loggedIn }),
  dispatch => ({
    ready: () => dispatch(googleApiReady()),
    setLoggedInStatus: (status) => dispatch(setLoggedInStatus(status))
  })
)(GoogleApi)

export default ConnectedGoogleApi
