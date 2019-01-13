import * as core from './core';

import {
  AUTH_FIELD_CHANGE,

  TOKEN_LOGIN,
  TOKEN_LOGIN_SUCCESS,
  TOKEN_LOGIN_FAILURE,
  TOKEN_LOGIN_NO_KEY,

  // LOGIN,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,

  // REGISTER,

  // LOGOUT_SUCCESS,
  // LOGOUT_FAILURE,
  //
  // REGISTER_SUCCESS,
  //
  // REDIRECT_TO_LOGIN,

} from '../../actionTypes';

const initialState = new core.InitialState();

export default function (state = initialState, {type, payload}) {

  switch (type) {

    case AUTH_FIELD_CHANGE:
      return state.setIn(payload.fieldKey.split('.'), payload.value);
    //
    // case LOGIN_SUCCESS:
    //   return core.processAccountDetails(state, payload, false);
    //
    case TOKEN_LOGIN_SUCCESS:
      console.log(type, payload);
      return core.processAccountDetails(state, payload, true);
        // .set('isLoggedIn', true)
        // .set('permissions', core.parsePermissionsPayload(payload.permissions));

    case TOKEN_LOGIN:
      console.log(type, payload);
      return state;

    case TOKEN_LOGIN_FAILURE:
    case TOKEN_LOGIN_NO_KEY:
      console.log(type, payload);
        return state
          .set('isLoggedIn', false)
          .set('attemptedTokenLogin', true);

    // case REGISTER_FAILURE:
    //   console.log(type, payload);
    //   return state;
    //
    // case LOGOUT_FAILURE:
    // case LOGOUT_SUCCESS:
    // case LOGIN_FAILURE:
    //   return initialState;

  };

  return state;
}
