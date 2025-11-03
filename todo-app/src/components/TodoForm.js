import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [priority, setPriority] = useState(props.edit ? props.edit.priority : 'Medium');
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
      id: Math.floor(Math.random() * 10000),
      text: input,
      priority: priority,
      dueDate: dueDate
    });
    setInput('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <select value={priority} onChange={handlePriorityChange} className='todo-select'>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
          <input
            type='date'
            value={dueDate}
            onChange={handleDueDateChange}
            className='todo-date'
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
