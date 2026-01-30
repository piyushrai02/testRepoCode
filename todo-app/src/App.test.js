import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/What's the Plan for Today\?/i);
  expect(linkElement).toBeInTheDocument();
});
