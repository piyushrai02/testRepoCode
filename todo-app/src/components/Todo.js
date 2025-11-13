import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Check for due date notifications
  useEffect(() => {
    const checkNotifications = setInterval(() => {
      const now = new Date();
      todos.forEach(todo => {
        if (todo.dueDate && !todo.isComplete && !todo.notified) {
          const dueDate = new Date(todo.dueDate);
          const timeDiff = dueDate - now;

          // Notify 5 minutes before due date
          if (timeDiff > 0 && timeDiff <= 5 * 60 * 1000) {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Todo Reminder!', {
                body: `"${todo.text}" is due in ${Math.round(timeDiff / 60000)} minutes!`,
                icon: '/favicon.ico'
              });

              // Mark as notified to avoid duplicate notifications
              setTodos(prev => prev.map(item =>
                item.id === todo.id ? { ...item, notified: true } : item
              ));
            }
          }

          // Notify when overdue
          if (timeDiff < 0 && timeDiff > -60000 && !todo.overdueNotified) {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Todo Overdue!', {
                body: `"${todo.text}" is now overdue!`,
                icon: '/favicon.ico'
              });

              setTodos(prev => prev.map(item =>
                item.id === todo.id ? { ...item, overdueNotified: true } : item
              ));
            }
          }
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkNotifications);
  }, [todos]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addTodo = todo => {
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todos.map(todo => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Todo;
