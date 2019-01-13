import * as Rx from 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import _assign from 'lodash/assign';

export function getReq (url, token) {
  const headers = prepareAuthorizationHeaders(token);
  return Observable.ajax.getJSON(url, headers)
    .catch(parseAjaxError);
}

export function getReqWithBody (url, body, token) {
  const headers = prepareAuthorizationHeaders(token);
  return Observable.ajax.getJSON(prepareUrlWithParams(url, body), headers)
    .catch(parseAjaxError);
}

export function postReq (url, body, token) {
  const headers = prepareJSONHeaders(
    prepareAuthorizationHeaders(token)
  );
  return Observable.ajax.post(url, body, headers)
    .map(parseAjaxResponse)
    .catch(parseAjaxError);
  // return fetch(url, {body, headers});
}

export function putReq (url, body, token) {
  const headers = prepareJSONHeaders(
    prepareAuthorizationHeaders(token)
  );
  return Observable.ajax.put(url, body, headers)
    .map(parseAjaxResponse)
    .catch(parseAjaxError);
}

export function patchReq (url, body, token) {
  const headers = prepareJSONHeaders(
    prepareAuthorizationHeaders(token)
  );
  return Observable.ajax.patch(url, body, headers)
    .map(parseAjaxResponse)
    .catch(parseAjaxError);
}

export function deleteReq (url, token) {
  const headers = prepareAuthorizationHeaders(token);
  return Observable.ajax.delete(url, headers)
    .map(parseAjaxResponse)
    .catch(parseAjaxError);
}

export function putFileReq (url, body, token) {
  const formData = new FormData();
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });
  const headers = prepareAuthorizationHeaders(token);
  return Observable.ajax.put(url, formData, headers)
    .map(parseAjaxResponse)
    .catch(parseAjaxError);
}

function prepareAuthorizationHeaders (token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function prepareJSONHeaders (headers, contentType) {
  return _assign({}, headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
}

// const prepareUrl = (url) => API_URL + url;

function prepareUrlWithParams(url, params) {
  const newParams = params?JSON.parse(JSON.stringify(params).replace('+', '%2B')):JSON.parse(JSON.stringify({}));
  url = Object.keys(newParams).reduce((url, key) => url += `&${key}=${newParams[key]}`, url);
  // for (key in newParams) {
  //   url += `&${key}=${newParams[key]}`;
  // }
  return url;
}


function parseAjaxResponse (response) {
  return response.response;
}

function parseAjaxError (response) {
  throw response.xhr.response
}
