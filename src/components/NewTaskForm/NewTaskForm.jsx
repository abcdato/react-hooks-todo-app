/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DataContext } from '../App/App';

function NewTaskForm() {
  const { setTodoData } = useContext(DataContext);
  const [todo, setTodo] = useState('');

  const createTask = (label) => ({
    label,
    done: false,
    editing: false,
    creationDate: String(new Date()),
    id: uuidv4(),
  });

  const handleAdd = (label) => {
    const newTask = createTask(label);

    setTodoData((prevData) => [...prevData, newTask]);
  };

  const onChange = (e) => {
    const todoField = e.target.value;
    setTodo(todoField);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() === '') {
      setTodo('');
      return;
    }

    handleAdd(todo.trim());
    setTodo('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        type="text"
        name="label"
        value={todo}
        onChange={onChange}
      />
      <input className="visually-hidden" type="submit" value="Submit" />
    </form>
  );
}

export default NewTaskForm;
