import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DeletePostFeedback from '../../components/posts/DeletePostFeedback';

describe('test DeletePostFeedback component', () => {
  const mockStore = configureStore();

  let store;

  it('test to delete a post', () => {
    store = mockStore({
      postReducer: { deletePost: { id: 1, title: 'deleteTitle', userId: 2, body: 'deleteBody' } }
    });
    const { getByText } = render(
      <Provider store={store}>
        <DeletePostFeedback />
      </Provider>
    );
    expect(getByText('Are you sure you want to delete the below post ?')).not.toBeNull();
  });
});
