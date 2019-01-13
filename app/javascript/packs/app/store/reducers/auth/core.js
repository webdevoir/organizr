import {Record} from 'immutable';

import {
  AccountDetails,
  RegisterForm,
  PermissionSet,
  Validator,
} from './model';

export const InitialState = new Record({
  accountDetails: AccountDetails(),
  registerForm: RegisterForm(),
  isLoggedIn: false,
  attemptedTokenLogin: false,
  permissions: PermissionSet(),
  accessLevel: null,
  validator: Validator()
});

export function processAccountDetails(state, payload, attemptedTokenLogin){
  return state
    .setIn(['accountDetails', 'firstName'], payload.first_name)
    .setIn(['accountDetails', 'lastName'], payload.last_name)
    .setIn(['accountDetails', 'email'], payload.email)
    .set('isLoggedIn', true)
    .set('attemptedTokenLogin', attemptedTokenLogin)
    .set('accessLevel', payload.user.access_level_tag);
}

// export function parsePermissionsPayload({external, internal, admin}) {
//   return new PermissionSet({
//     external: new List(external),
//     internal: new List(internal),
//     admin: new List(admin)
//   });
// }

/*
  For the verify email token field, you should include it as part of the
  AuthForm() model. Then, when you implement copy files, include a key 'isVisible'.
  When the REGISTER_SUCCESS action is dispatched, have the 'detailsView' component
  (or whichever form renderer you end up making) rerender the form accordingly
*/
