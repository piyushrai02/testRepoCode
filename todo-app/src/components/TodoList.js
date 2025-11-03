import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const TodoList = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    priority: '',
    dueDate: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      priority: '',
      dueDate: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? `todo-row complete ${todo.priority}` : `todo-row ${todo.priority}`}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
        <div className='todo-subtext'>
          <span>Priority: {todo.priority}</span>
          <span>Due: {todo.dueDate}</span>
        </div>
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text, priority: todo.priority, dueDate: todo.dueDate })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default TodoList;
