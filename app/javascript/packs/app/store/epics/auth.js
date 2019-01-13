import * as Rx from 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/ignoreElements';

import {combineEpics} from 'redux-observable';

import _isNil from 'lodash/isNil';

import {

  TOKEN_LOGIN,
  TOKEN_LOGIN_SUCCESS,
  TOKEN_LOGIN_FAILURE,
  TOKEN_LOGIN_NO_KEY,


  REGISTER,
  REGISTER_SUCCESS,
  // REGISTER_INVALID,
  REGISTER_FAILURE,

  // LOGIN,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,

  // LOGOUT,
  // LOGOUT_SUCCES,
  // LOGOUT_FAILURE,
  //

  // REGISTER_SUCCESS,
  // REGISTER_FAILURE,
  //
  // VERIFY_EMAIL,
  // VERIFY_EMAIL_SUCCESS,
  // VERIFY_EMAIL_FAILURE,
} from '../actionTypes';

import {
  // loginRequest,
  tokenLoginRequest,
  // registerRequest,
  // verifyEmailRequest,
  registerRequest,
  // loadRegistrationForm,
  // emailValidation,
  // resendVerificationLinkSubmit,
  // resetPasswordToken,
  // resetPassword,
} from '../../lib/backend';


import {getAuthToken, storeAuthToken, deleteAuthToken} from '../../lib/authToken';

// import * as authSelectors from '../selectors/auth';

// import {RegistrationFormConstraints} from '../constraints';
// import {browserHistory} from 'react-router';

// const loginInvalid = (payload) => ({payload, type: LOGIN_INVALID});
// const loginSuccess = (payload) => ({payload: payload, type: LOGIN_SUCCESS});
// const loginFailure = (payload) => ({payload: payload, type: LOGIN_FAILURE});
// const executeLogin = (action$, store) =>
//   action$.ofType(LOGIN)
//    .switchMap(() =>
//       Observable.of(store.getState())
//       .map(authSelectors.loginFormSelector)
//       .mergeMap((payload) => loginRequest(payload)
//        .do((response) => authToken.storeAuthToken(response.jwt))
//        .map(loginSuccess)
//        .catch((error) => Observable.of(error)
//          .do(console.log)
//          .map(loginFailure)
//        )
//      )
//    );

const tokenLoginSuccess = (payload) => ({payload, type: TOKEN_LOGIN_SUCCESS});
const tokenLoginFailure = (payload) => ({payload, type: TOKEN_LOGIN_FAILURE});
const tokenLoginNoKey = (payload) => ({payload, type: TOKEN_LOGIN_NO_KEY});
const executeTokenLogin = (action$, store) =>
  action$.ofType(TOKEN_LOGIN)
    .flatMap((action) => {
      const token = getAuthToken();
      if(!_isNil(token)) {
        return (
          tokenLoginRequest(token)
            .do((payload) => {
              storeAuthToken(payload.jwt);
              return payload;
            })
            .map(tokenLoginSuccess)
            .catch((error) => Rx.Observable.of(error)
              .do((error) =>{
                console.log(`Invalid Token Login: ${error}`);
              })
              .map(()=>{
                Rx.Observable.of(
                  deleteAuthToken()
                )
                // tokenLoginFailure
              })
            )
        )
      }
      return Rx.Observable.of(tokenLoginNoKey());
    });

const registerSuccess = (payload) => ({payload, type: REGISTER_SUCCESS});
const registerFailure = (payload) => ({payload, type: REGISTER_FAILURE});
const executeRegister = (action$, store) =>
  action$.ofType(REGISTER)
    .flatMap(() => {
      // const serverPayload = authSelectors.registerFormSelector(store.getState()).toJS();
      return registerRequest(serverPayload)
        .map(registerSuccess)
        .catch((error) => Rx.Observable.of(error)
          .do((error) => {
            console.log(`Error: ${error}`);
          })
        .map(registerFailure)
      )
    });

// const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
// const logoutFailure = () => ({type: LOGOUT_FAILURE});
// //IMPLEMENT SERVERSIDE LOGOUT! Simply deleting the client's jwt is only a temporary solution.
// const executeLogout = (action$) =>
//   action$.ofType(LOGOUT)
//     .flatMap((action) =>
//       Rx.Observable.of(
//         deleteAuthToken()
//       )
//         .do(browserHistory.push(`/login`))
//         .map(logoutSuccess)
//         .catch((error) => Rx.Observable.of(error)
//           .do((error) =>{
//             browserHistory.push(`/login`)
//           })
//           .map(logoutFailure)
//         )
//     );
//
//
// const verifyEmailSuccess = () => ({type: VERIFY_EMAIL_SUCCESS});
// const verifyEmailFailure = () => ({type: VERIFY_EMAIL_FAILURE});
// const executeVerifyEmail = (action$, store) =>
//   action$.ofType(VERIFY_EMAIL)
//     .flatMap(() => {
//       const state = store.getState();
//       const token = state.getIn(['auth', 'form', 'verifyEmailToken']);
//       return verifyEmailRequest(token)
//         .map(verifyEmailSuccess)
//         .catch((error) => Rx.Observable.of(error)
//           .do((error) => {
//             console.log(`Error: ${error.error}`);
//           })
//           .map(verifyEmailFaiure)
//         )
//    });


export default combineEpics(
  executeTokenLogin,
  executeRegister
);
