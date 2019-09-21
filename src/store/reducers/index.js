import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';
import queueReducer from './queueReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  queue: queueReducer,
});

export default rootReducer;
