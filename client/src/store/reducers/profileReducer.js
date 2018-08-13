import * as actionTypes from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

const profileLoading = (state, action) => ({
  ...state,
  loading: true
});

const getProfile = (state, action) => ({
  ...state,
  profile: action.payload,
  loading: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOADING:
      return profileLoading(state, action);
    case actionTypes.GET_PROFILE:
      return getProfile(state, action);
    default:
      return state;
  }
};
