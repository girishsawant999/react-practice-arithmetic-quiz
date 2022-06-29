import { createAction } from 'redux-actions';

// action types
export const SET_TEST_CONFIG_DATA = 'SET_TEST_CONFIG_DATA';
export const UPDATE_TEST_STATE_FOR_WINDOW = 'UPDATE_TEST_STATE_FOR_WINDOW';

// action creators
export const setTestConfigData = createAction(SET_TEST_CONFIG_DATA);
export const updateTestStateForWindow = createAction(UPDATE_TEST_STATE_FOR_WINDOW);

export const types = {
  SET_TEST_CONFIG_DATA,
  UPDATE_TEST_STATE_FOR_WINDOW
};
