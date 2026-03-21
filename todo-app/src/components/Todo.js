import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import SearchBar from './SearchBar';

const Todo = () => {
  const [todos1, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = todo = {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>What's the Plan for Today ?</h1>
      <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={filteredTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default Todo1;
