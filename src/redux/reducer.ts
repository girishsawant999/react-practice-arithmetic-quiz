import { handleActions } from 'redux-actions';
import { types } from './actions';

const actionHandler = {
  [types.SET_TEST_CONFIG_DATA]: (state: any, action: any) => {
    return {
      ...state,
      testConfigData: action.payload
    };
  },
  [types.UPDATE_TEST_STATE_FOR_WINDOW]: (state: any, action: any) => {
    const { windowNo, currentQuestionObject, currentQueNo } = action.payload;
    return {
      ...state,
      [`testWindow-${windowNo}`]: {
        ...state[`testWindow-${windowNo}`],
        currentQuestionNo: currentQueNo,
        questions: {
          ...state[`testWindow-${windowNo}`]?.questions,
          [currentQueNo]: {
            ...state[`testWindow-${windowNo}`]?.questions[currentQueNo],
            ...currentQuestionObject
          }
        }
      }
    };
  }
};

export type RootState = {
  testConfigData: null | { operandsRange: number; questionsCount: number };
};

export default handleActions(actionHandler, {
  testConfigData: null
});
