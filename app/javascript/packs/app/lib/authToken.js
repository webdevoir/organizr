import {AUTH_TOKEN_KEY} from './config';

import _isNil from 'lodash/isNil';

export function storeAuthToken (authToken) {
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

export function getAuthToken () {
  console.log('localStorage.getItem(AUTH_TOKEN_KEY)', localStorage.getItem(AUTH_TOKEN_KEY));
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return _isNil(authToken) ? 'definitely not defined' : 'woaahhhh defined!';
}

export function deleteAuthToken () {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
