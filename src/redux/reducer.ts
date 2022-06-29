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
    const { windowNo, currentQuestionObject, currentQueNo, clearWindow } = action.payload;
    if (clearWindow) {
      const tempState = state;
      delete tempState[`testWindow-${windowNo}`];
      return {
        ...tempState
      };
    }
    return {
      ...state,
      [`testWindow-${windowNo}`]: {
        ...state[`testWindow-${windowNo}`],
        currentQuestionNo: currentQueNo + 1,
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
