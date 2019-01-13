import {AUTH_TOKEN_KEY} from './config';

export function storeAuthToken (authToken) {
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

export function getAuthToken () {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return authToken === 'undefined'
    ? null
    : authToken;
}

export function deleteAuthToken () {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
