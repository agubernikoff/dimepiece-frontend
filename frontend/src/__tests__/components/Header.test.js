import { render } from '@testing-library/react';
import Header from '../../layouts/Header';
import { Provider } from 'react-redux';
import store from '../../redux';

// snapshot testing
test('renders Header component', () => {
  const navbar = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  expect(navbar).toMatchSnapshot();
});
