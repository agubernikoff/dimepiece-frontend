import { render } from '@testing-library/react';
import AddOrEditPost from '../../components/posts/AddOrEditPost';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('test AddOrEditPost component', () => {
  const postReducerState = {
    addNewPost: {},
    allPosts: [],
    viewablePosts: [],
    allPostsLoading: [],
    deletePost: {},
    editPost: {},
    preEditPost: false
  };
  const mockStore = configureStore();

  let store;

  it('test to create new post', () => {
    store = mockStore({ postReducer: { ...postReducerState, addNewPost: { title: 'create' } } });
    const { getByText } = render(
      <Provider store={store}>
        <AddOrEditPost />
      </Provider>
    );
    expect(getByText('Create new post')).not.toBeNull();
  });

  it('test to edit a post', () => {
    store = mockStore({
      postReducer: {
        ...postReducerState,
        editPost: { id: 1, userId: 1, title: 'update', body: 'edit body' }
      }
    });
    const { getByText } = render(
      <Provider store={store}>
        <AddOrEditPost />
      </Provider>
    );
    expect(getByText('Update post #1')).not.toBeNull();
  });


  it('test to edit a post with search option', () => {
    store = mockStore({
      postReducer: {
        ...postReducerState,
        preEditPost: true,
      }
    });
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <AddOrEditPost />
      </Provider>
    );
    expect(getByText('Search a title')).not.toBeNull();
    expect(getByTestId('add-or-edit-post-search').placeholder).toBe('Search for exact title to edit')
  });
});
