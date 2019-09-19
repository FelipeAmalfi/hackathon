import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  queue: queueReducer,
  profile: profileReducer,
});

export default rootReducer;
