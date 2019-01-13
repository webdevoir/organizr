import {createSelector} from 'reselect';

export function genSubformSelector(formSelector, formFields) {
  return createSelector(
    formSelector,
    (form) => form
      .toMap()
      .filter((value, key) => formFields.includes(key))
      .toJS()
  );
}
