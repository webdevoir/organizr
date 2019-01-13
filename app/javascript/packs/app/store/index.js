import {
  applyMiddleware,
  createStore
} from 'redux';

import {createEpicMiddleware} from 'redux-observable';
import {routerMiddleware} from 'react-router-redux';

import rootReducer from './reducers';
import rootEpic from './epics';


const epicMiddleware = createEpicMiddleware();

export default function configureStore (history, initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      routerMiddleware(history),
      epicMiddleware
    ),
  );
  epicMiddleware.run(rootEpic);
  return store;
}
