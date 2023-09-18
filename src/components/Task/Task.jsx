/* eslint-disable import/no-cycle */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import DataContext from '../Context/DataContext';

function Task(props) {
  const { label, done, editing, creationDate } = props;

  const [todo, setTodo] = useState(label);

  const { todoData, setTodoData } = useContext(DataContext);

  const toggleProp = (arr, id, propName) =>
    arr.map((el) => {
      if (el.id === id) {
        return { ...el, [propName]: !el[propName] };
      }
      return el;
    });

  const onToggleDone = () => {
    const { id } = props;
    const status = toggleProp(todoData, id, 'done');

    setTodoData(status);
  };

  const onToggleEditing = () => {
    const { id } = props;

    setTodoData(toggleProp(todoData, id, 'editing'));
  };

  const handleDelete = () => {
    const { id } = props;
    const filteredTodos = todoData.filter((item) => item.id !== id);

    setTodoData(filteredTodos);
  };

  const handleEdit = (id, text) => {
    const newTodos = [...todoData].map((item) => {
      if (item.id === id) {
        const task = item;
        task.label = text;
      }
      return todo;
    });

    setTodoData(newTodos);
  };

  const handleChange = (e) => {
    const todoField = e.target.value;
    setTodo(todoField);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id } = props;

    if (todo.trim() === '') {
      handleDelete();
      return;
    }

    handleEdit(id, todo);
    onToggleEditing(id);
  };

  const time = formatDistanceToNow(new Date(creationDate), {
    includeSeconds: true,
  });

  let className = '';
  if (done) {
    className = 'completed';
  }
  if (editing) {
    className = 'editing';
  }

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={onToggleDone}
        />
        <label>
          <span className="title">{label}</span>
          <span className="description">created {time} ago</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={onToggleEditing}
          type="button"
          aria-label="edit"
        />
        <button
          className="icon icon-destroy"
          onClick={handleDelete}
          type="button"
          aria-label="delete"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="edit"
          value={todo}
          onChange={handleChange}
        />
      </form>
    </li>
  );
}

export default Task;

Task.defaultProps = {
  id: '',
  label: 'Default task',
  done: false,
  editing: false,
  creationDate: String(new Date()),
};

Task.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  done: PropTypes.bool,
  editing: PropTypes.bool,
  creationDate: PropTypes.string,
};
