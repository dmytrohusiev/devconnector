import * as actionTypes from "../actions/types";
import isEmpty from "../../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const setCurrentUser = (state, action) => {
  return {
    ...state,
    isAuthenticated: !isEmpty(action.payload),
    user: action.payload
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return setCurrentUser(state, action);
    default:
      return state;
  }
};
