const {
  AUTH_FIELD_CHANGE,
  TOKEN_LOGIN,
  REGISTER,
} = require('../actionTypes');

export const authFieldChange = (payload) => ({type: AUTH_FIELD_CHANGE, payload: payload});
export const tokenLogin = () => ({type: TOKEN_LOGIN});
export const register = () => ({type: REGISTER});
