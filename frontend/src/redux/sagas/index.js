import { all, fork } from 'redux-saga/effects';
import postsSagas from './posts';

const rootSaga = function* () {
  yield all([fork(postsSagas)]);
};

export default rootSaga;
