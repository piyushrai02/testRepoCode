import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from './Todo';

test('filters todos based on search term', () => {
  render(<Todo />);

  // Add some todos
  const input = screen.getByPlaceholderText('Add a todo');
  const addButton = screen.getByText('Add todo');

  fireEvent.change(input, { target: { value: 'Buy Milk' } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: 'Go for a run' } });
  fireEvent.click(addButton);

  // Verify both are present
  expect(screen.getByText('Buy Milk')).toBeInTheDocument();
  expect(screen.getByText('Go for a run')).toBeInTheDocument();

  // Search for "Milk"
  const searchInput = screen.getByPlaceholderText('Search...');
  fireEvent.change(searchInput, { target: { value: 'Milk' } });

  // Verify only "Buy Milk" is present
  expect(screen.getByText('Buy Milk')).toBeInTheDocument();
  expect(screen.queryByText('Go for a run')).not.toBeInTheDocument();
});
