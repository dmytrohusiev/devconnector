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

const clearCurrentProfile = (state, action) => ({
  ...state,
  profile: null
});

const getProfiles = (state, action) => ({
  ...state,
  profiles: action.payload,
  loading: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOADING:
      return profileLoading(state, action);
    case actionTypes.GET_PROFILE:
      return getProfile(state, action);
    case actionTypes.CLEAR_CURRENT_PROFILE:
      return clearCurrentProfile(state, action);
    case actionTypes.GET_PROFILES:
      return getProfiles(state, action);
    default:
      return state;
  }
};
