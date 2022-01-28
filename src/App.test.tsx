import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('learn react should be a link', () => {
  render(<App />);
  const text = screen.getByText(/learn react/i);
  expect(text).toHaveAttribute('href', 'https://reactjs.org')
})