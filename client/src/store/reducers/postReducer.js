import * as actionTypes from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

const addPost = (state, action) => ({
  ...state,
  posts: [action.payload, ...state.posts]
});

const setPostLoading = (state, action) => ({
  ...state,
  loading: true
});

const getPosts = (state, action) => ({
  ...state,
  posts: action.payload,
  loading: false
});

const deletePost = (state, action) => ({
  ...state,
  posts: state.posts.filter(post => post._id !== action.payload)
});

const getPost = (state, action) => ({
  ...state,
  post: action.payload,
  loading: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_LOADING:
      return setPostLoading(state, action);
    case actionTypes.GET_POSTS:
      return getPosts(state, action);
    case actionTypes.ADD_POST:
      return addPost(state, action);
    case actionTypes.DELETE_POST:
      return deletePost(state, action);
    case actionTypes.GET_POST:
      return getPost(state, action);
    default:
      return state;
  }
};
