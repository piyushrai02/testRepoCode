import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { MdDragIndicator } from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoItem = ({ todo, completeTodo, removeTodo, setEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const isOverdue = date < now && !todo.isComplete;

    const formatted = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return (
      <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
        {isOverdue ? '⚠️ ' : '📅 '}{formatted}
      </span>
    );
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: '🔴 High',
      medium: '🟡 Medium',
      low: '🟢 Low'
    };
    return labels[priority] || labels.medium;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`todo-row ${todo.isComplete ? 'complete' : ''} priority-${todo.priority || 'medium'}`}
    >
      <div className='drag-handle' {...attributes} {...listeners}>
        <MdDragIndicator />
      </div>
      <div className='todo-content' onClick={() => completeTodo(todo.id)}>
        <div className='todo-text'>{todo.text}</div>
        <div className='todo-metadata'>
          <span className='priority-badge'>{getPriorityLabel(todo.priority || 'medium')}</span>
          {todo.dueDate && formatDueDate(todo.dueDate)}
        </div>
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({
            id: todo.id,
            value: todo.text,
            priority: todo.priority || 'medium',
            dueDate: todo.dueDate || '',
            isComplete: todo.isComplete
          })}
          className='edit-icon'
        />
      </div>
    </div>
  );
};

const TodoList = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    priority: 'medium',
    dueDate: '',
    isComplete: false
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      priority: 'medium',
      dueDate: '',
      isComplete: false
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      completeTodo={completeTodo}
      removeTodo={removeTodo}
      setEdit={setEdit}
    />
  ));
};

export default TodoList;
