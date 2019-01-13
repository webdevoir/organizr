import {createSelector} from 'reselect';

import _get from 'lodash/get';
import _isNil from 'lodash/isNil';

import {genSubformSelector} from './util';

const loginFields = ['email', 'password'];
const forgotPasswordFields = ['email'];
const resetPasswordFields = ['password', 'confirmPassword'];

const isLoggedInSelector = (state) => state.getIn(['auth', 'isLoggedIn']);
const attemptedTokenLoginSelector = (state) => state.getIn(['auth', 'attemptedTokenLogin']);
const accessLevelSelector = (state) => state.getIn(['auth', 'accessLevel']);
//const authFormSelector = (state) => state.getIn(['auth', 'form']);
export const registerFormSelector = (state) => state.getIn(['auth', 'registerForm']);
const propsSelector = (state, props) => (props);

const requiredAccessLevelSelector = (state, props) =>
  _get(props, ['children', 'props', 'route', 'requiredAccessLevel'], null);

const requiredPermissionSelector = (state, props) => {
  const permissionGroup = Object.keys(props.permission)[0];
  const permissionType = props.permission[permissionGroup];
  return {permissionGroup, permissionType};
}

const hasAccessSelector = createSelector(
  [accessLevelSelector, requiredAccessLevelSelector],
  (accessLevel, requiredAccessLevel) => (
    _isNil(requiredAccessLevel)
    || requiredAccessLevel === accessLevel
    || requiredAccessLevel.includes(accessLevel)
  )
);


export const appSelector = createSelector(
  [isLoggedInSelector, attemptedTokenLoginSelector, hasAccessSelector, accessLevelSelector, requiredAccessLevelSelector],
  (isLoggedIn, attemptedTokenLogin, hasAccess, accessLevel, requiredAccessLevel) => ({
    requiredAccessLevel: requiredAccessLevel,
    shouldHideChildren: !attemptedTokenLogin && !isLoggedIn && !hasAccess,
    shouldReroute:  attemptedTokenLogin && !hasAccess,
    hasAccess: hasAccess,
    accessLevel: accessLevel
  })
);
