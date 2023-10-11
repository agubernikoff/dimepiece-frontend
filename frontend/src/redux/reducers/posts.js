import * as actionType from '../actionTypes';

const initialState = {
  allPosts: [],
  allPostsLoading: false,
  viewablePosts: [],
  preEditPost: false,
  addNewPost: {},
  editPost: {},
  deletePost: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionType.FETCH_ALL_POST_LOADING: {
      return {
        ...state,
        allPostsLoading: true
      };
    }
    case actionType.FETCH_ALL_POST_SUCCESS: {
      return {
        ...state,
        allPosts: action.payload,
        viewablePosts: action.payload,
        allPostsLoading: false
      };
    }
    case actionType.FETCH_ALL_POST_ERROR: {
      return {
        ...state,
        allPosts: [],
        viewablePosts: [],
        allPostsLoading: false
      };
    }
    case actionType.SET_PRE_EDIT_POST_REDUCER: {
      return {
        ...state,
        preEditPost: action.payload
      };
    }
    case actionType.UPDATE_VIEW_POST: {
      return {
        ...state,
        viewablePosts: action.payload
      };
    }
    case actionType.SET_ADD_NEW_POST: {
      return {
        ...state,
        addNewPost: action.payload
      };
    }
    case actionType.RESET_ADD_POST: {
      return {
        ...state,
        addNewPost: {}
      };
    }
    case actionType.UPDATE_LIST: {
      return {
        ...state,
        preEditPost: false,
        addNewPost: {},
        editPost: {},
        deletePost: {},
        allPosts: [...action.payload.allPosts],
        viewablePosts: [...action.payload.viewablePosts]
      };
    }
    case actionType.SET_EDIT_POST_VALUE: {
      return {
        ...state,
        editPost: action.payload
      };
    }
    case actionType.RESET_EDIT_POST: {
      return {
        ...state,
        editPost: {}
      };
    }
    case actionType.SET_DELETE_POST_VALUE: {
      return {
        ...state,
        deletePost: action.payload
      };
    }
    case actionType.RESET_DELETE_POST: {
      return {
        ...state,
        deletePost: {}
      };
    }
    default: {
      return { ...state };
    }
  }
}
