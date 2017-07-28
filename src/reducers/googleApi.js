const READY = 'GoogleApi@READY';
const LOGIN_STATUS = 'GoogleApi@LOGIN_STATUS';

export const googleApiReady = () => ({ type: READY });
export const setLoggedInStatus = (status) => ({ type: LOGIN_STATUS, status });
const INITIAL_STATE = { ready: false, loggedIn: false };

export default function reducer (state = INITIAL_STATE, action) {
  if (action.type === READY) {
    return { ready: true, loggedIn: state.loggedIn };
  } else if (action.type === LOGIN_STATUS) {
    return { ready: state.ready, loggedIn: action.status };
  }
  return state;
}
