import produce from 'immer';
import {LoginConst} from '../types';

const initialState = {
  userInfo: {},
  error: false,
  canLogin: false,
};

export default (state = initialState, {type, payload}) =>
  produce(state, draft => {
    switch (type) {
      case LoginConst.LOGIN_SUCESSFUL:
        draft.userInfo = payload.user;
        draft.error = false;
        draft.canLogin = true;
        break;
      case LoginConst.LOGIN_ERROR:
        draft.error = true;
        break;
    }
  });
