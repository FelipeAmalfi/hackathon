import produce from 'immer';
import {LoginConst} from '../types';

const initialState = {
  token: null,
  userInfo: {},
  userPermissions: {},
  networkSettings: {},
  isLoading: false,
  error: false,
};

export default (state = initialState, {type, payload}) =>
  produce(state, draft => {
    switch (type) {
      case LoginConst.LOGIN_SUCESSFUL:
        draft.error = false;
        draft.isLoading = false;
        const {token} = payload;
        draft.token = token;
        draft.isLoading = false;
        break;
      case LoginConst.USER_INFO_LOGIN:
        const {userInfo, userPermissions, networkSettings} = payload;
        draft.userInfo = userInfo;
        draft.userPermissions = userPermissions;
        draft.networkSettings = networkSettings;
        break;
      case LoginConst.LOGOFF:
        draft.token = null;
        break;
      case LoginConst.LOGIN_ERROR:
        draft.error = true;
        break;
      case LoginConst.LOGIN_LOADING:
        draft.isLoading = true;
        break;
    }
  });
