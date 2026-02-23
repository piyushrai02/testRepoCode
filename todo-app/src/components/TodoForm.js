import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [priority, setPriority] = useState(props.edit ? props.edit.priority : 'medium');
  const [dueDate, setDueDate] = useState(props.edit ? props.edit.dueDate : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handlePriorityChange = e => {
    setPriority(e.target.value);
  };

  const handleDueDateChange = e => {
    setDueDate(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: props.edit ? props.edit.id : Math.floor(Math.random() * 10000000),
      text: input,
      priority: priority,
      dueDate: dueDate,
      isComplete: props.edit ? props.edit.isComplete : false
    });
    setInput('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <div className='form-row'>
            <input
              placeholder='Update your item'
              value={input}
              onChange={handleChange}
              name='text'
              ref={inputRef}
              className='todo-input edit'
            />
          </div>
          <div className='form-row'>
            <select
              value={priority}
              onChange={handlePriorityChange}
              className='todo-select edit'
            >
              <option value='low'>Low Priority</option>
              <option value='medium'>Medium Priority</option>
              <option value='high'>High Priority</option>
            </select>
            <input
              type='datetime-local'
              value={dueDate}
              onChange={handleDueDateChange}
              className='todo-datetime edit'
            />
          </div>
          <button onClick={handleSubmit} className='todo-button edit full-width'>
            Update
          </button>
        </>
      ) : (
        <>
          <div className='form-row'>
            <input
              placeholder='Add a todo'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input'
              ref={inputRef}
            />
          </div>
          <div className='form-row'>
            <select
              value={priority}
              onChange={handlePriorityChange}
              className='todo-select'
            >
              <option value='low'>Low Priority</option>
              <option value='medium'>Medium Priority</option>
              <option value='high'>High Priority</option>
            </select>
            <input
              type='datetime-local'
              value={dueDate}
              onChange={handleDueDateChange}
              className='todo-datetime'
              placeholder='Due date'
            />
          </div>
          <button onClick={handleSubmit} className='todo-button full-width'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
