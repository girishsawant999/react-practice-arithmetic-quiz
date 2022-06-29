import React from 'react';
import { render, screen } from '@testing-library/react';
import TestPage from '.';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

test('renders Test page', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <TestPage />
      </Provider>
    </BrowserRouter>
  );
  // Test Window -1 must be present

  const startTestBtn = document.querySelector('button');
  console.log('startTestBtn', startTestBtn);

  expect(screen.getByText('Test Window - 1')).toBeInTheDocument();
  expect(screen.getByText('Test Window - 2')).toBeInTheDocument();
});
