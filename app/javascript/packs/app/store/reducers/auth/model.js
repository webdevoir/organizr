import {Record, List} from 'immutable';

export const AccountDetails = new Record({
  email: '',
});

export const RegisterForm = new Record({
  email: '',
  password: '',
  confirmPassword: '',
});

export const PermissionSet = new Record({
  internal: new List(),
  external: new List(),
  admin: new List()
});

const ValidatorFields = new Record({
  isNotValid: false,
  message: '',
  validateKey: '',
});

const RegisterFormValidator = new Record({
  email: ValidatorFields(),
  password: ValidatorFields(),
  confirmPassword: ValidatorFields()
});

export const Validator = new Record({
  registerForm: RegisterFormValidator()
});
