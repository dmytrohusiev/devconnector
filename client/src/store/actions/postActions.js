import axios from "axios";
import * as actionTypes from "./types";

//Add post action
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: actionTypes.ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get posts for feed
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: actionTypes.GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_POSTS,
        payload: null
      })
    );
};

// Set post loading state
export const setPostLoading = () => ({
  type: actionTypes.POST_LOADING
});

// Delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_POST,
        payload: null
      })
    );
};

// Add comment
export const addComment = (postID, newComment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postID}`, newComment)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete comment
export const deleteComment = (postID, commentID) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postID}/${commentID}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
});
