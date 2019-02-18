import { clickReducer } from './clickReducer';
import { combineReducers } from 'redux';
import {reducer as offline} from 'redux-offline-queue';

export const Reducers = combineReducers({
  clickState: clickReducer,
  offline
});