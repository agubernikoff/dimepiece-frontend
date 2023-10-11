import { put, takeLatest, select, call } from 'redux-saga/effects';
import * as actionType from '../actionTypes';
import { getAllPostsApi } from '../api';

export function* fetchAllPostsSaga() {
  try {
    yield put({ type: actionType.FETCH_ALL_POST_LOADING });
    const data = yield call(getAllPostsApi);
    if (data?.status === 200 && data?.list) {
      yield put({ type: actionType.FETCH_ALL_POST_SUCCESS, payload: data?.list });
    } else {
      yield put({
        type: actionType.FETCH_ALL_POST_ERROR,
        error: new Error('Unable to get list!')
      });
    }
  } catch (error) {
    yield put({ type: actionType.FETCH_ALL_POST_ERROR, error: error });
  }
}

export function* setPreEditPostSaga(action) {
  yield put({ type: actionType.SET_PRE_EDIT_POST_REDUCER, payload: action.payload });
}

export function* searchPreEditPostSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  if (allPosts?.length > 0) {
    const preEdit = allPosts.find((obj) => obj.title === action.payload);
    if (preEdit?.id) {
      yield put({ type: actionType.SET_PRE_EDIT_POST_REDUCER, payload: false });
      yield put({
        type: actionType.SET_EDIT_POST_VALUE,
        payload: preEdit
      });
    }
  }
}

export function* selectPostSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  let data = [];
  if (!action?.payload?.id && action.payload !== null) {
    yield put({
      type: actionType.SET_ADD_NEW_POST,
      payload: { title: action?.payload?.inputValue ? action?.payload?.inputValue : '' }
    });
  }
  if (allPosts?.length > 0) {
    if (action?.payload?.title && action.payload?.id) {
      data = [allPosts.find((obj) => obj.id === action.payload.id)];
    } else {
      data = allPosts.map((a) => a);
    }
  }
  yield put({ type: actionType.UPDATE_VIEW_POST, payload: data });
}

export function* createPostSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  const viewablePosts = yield select((state) => state.postReducer.viewablePosts);

  let tempData = { ...action.payload, userId: Number(action.payload.userId) };
  tempData['id'] = allPosts.length ? allPosts[allPosts.length - 1]['id'] + 1 : 1;

  yield put({
    type: actionType.UPDATE_LIST,
    payload: { allPosts: [...allPosts, tempData], viewablePosts: [...viewablePosts, tempData] }
  });
}

export function* setEditPostSaga(action) {
  yield put({
    type: actionType.SET_EDIT_POST_VALUE,
    payload: action.payload
  });
}

export function* setUpdatePostSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  const viewablePosts = yield select((state) => state.postReducer.viewablePosts);

  let payload = {
    allPosts: [...allPosts],
    viewablePosts: [...viewablePosts]
  };

  const data = { ...action.payload, userId: Number(action.payload.userId) };
  const allPostsIndex = allPosts.findIndex((a) => a.id === data.id);
  if (allPostsIndex > -1) {
    payload['allPosts'][allPostsIndex] = { ...data };
  }

  const viewablePostsIndex = viewablePosts.findIndex((a) => a.id === data.id);
  if (viewablePostsIndex > -1) {
    payload['viewablePosts'][viewablePostsIndex] = { ...data };
  }

  yield put({
    type: actionType.UPDATE_LIST,
    payload
  });
}

export function* setDeletePostSaga(action) {
  yield put({
    type: actionType.SET_DELETE_POST_VALUE,
    payload: action.payload
  });
}

export function* confirmDeletionSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  const viewablePosts = yield select((state) => state.postReducer.viewablePosts);

  let payload = {
    allPosts: [...allPosts],
    viewablePosts: [...viewablePosts]
  };

  const allPostsIndex = allPosts.findIndex((a) => a.id === action.payload.id);
  if (allPostsIndex > -1) {
    payload['allPosts'].splice(allPostsIndex, 1);
  }

  const viewablePostsIndex = viewablePosts.findIndex((a) => a.id === action.payload.id);
  if (viewablePostsIndex > -1) {
    payload['viewablePosts'].splice(viewablePostsIndex, 1);
  }

  yield put({
    type: actionType.UPDATE_LIST,
    payload
  });
}

function* postsSaga() {
  yield takeLatest(actionType.FETCH_ALL_POST, fetchAllPostsSaga);
  yield takeLatest(actionType.SET_PRE_EDIT_POST, setPreEditPostSaga);
  yield takeLatest(actionType.SEARCH_PRE_EDIT_POST, searchPreEditPostSaga);
  yield takeLatest(actionType.SELECT_POST, selectPostSaga);
  yield takeLatest(actionType.CREATE_NEW_POST, createPostSaga);
  yield takeLatest(actionType.SET_EDIT_POST, setEditPostSaga);
  yield takeLatest(actionType.UPDATE_POST, setUpdatePostSaga);
  yield takeLatest(actionType.SET_DELETE_POST, setDeletePostSaga);
  yield takeLatest(actionType.DELETE_POST, confirmDeletionSaga);
}

export default postsSaga;
