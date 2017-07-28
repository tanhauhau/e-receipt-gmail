import { createStore } from 'redux';
import rootReducer from './index';

function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}

export { configureStore };
