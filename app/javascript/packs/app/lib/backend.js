import {getAuthToken} from './authToken';
import {
  // deleteReq,
  getReq,
  // getReqWithBody,
  patchReq,
  postReq
} from './backendUtils';

export function loginRequest (payload) {
  return postReq('/api/v1/session', payload);
}

export function tokenLoginRequest() {
  console.log('TOKEN LOGIN REQUEST IN BACKEND');
  return getReq('/api/v1/session', getAuthToken());
}


export function registerRequest(payload){
  return postReq('/api/v1/user', payload);
}

export function verifyEmailRequest(token){
  return getReq(`/api/v1/account?token=${token}`);
}

// export function logout () {
//   return deleteReq('/api/v1/session', getAuthToken());
// }

// export function forgotPassword (payload) {
//   return postReq('/api/reset_password', payload);
// }

// export function resetPassword (payload) {
//   return patchReq('/api/reset_password', payload);
// }
