import axios from "axios";
import * as actionTypes from "./types";

// GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: null
      })
    );
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      dispatch({
        type: actionTypes.CREATE_PROFILE
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_EXPERIENCE
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  dispatch({
    type: actionTypes.DELETE_EXPERIENCE
  });
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_EDUCATION
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  dispatch({
    type: actionTypes.DELETE_EDUCATION
  });
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILES,
        payload: null
      })
    );
};

// Delete Account & Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are You sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: actionTypes.SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  };
};
