import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ handleAdd }) {
  const [todo, setTodo] = useState('');

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

NewTaskForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};
