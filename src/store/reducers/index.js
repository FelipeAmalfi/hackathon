import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';
import profileReducer from './profileReducer';
import queueReducer from './queueReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  queue: queueReducer,
  profile: profileReducer,
});

export default rootReducer;
