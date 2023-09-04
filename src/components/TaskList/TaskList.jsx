import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

function TaskList({
  todos,
  handleDelete,
  handleEdit,
  onToggleDone,
  onToggleEditing,
  saveTimeToLocalStorage,
}) {
  const tasks = todos.map((item) => {
    const { id, ...itemProps } = item;
    console.log(id);
    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        handleDelete={() => handleDelete(id)}
        handleEdit={handleEdit}
        onToggleDone={() => onToggleDone(id)}
        onToggleEditing={() => onToggleEditing(id)}
        saveTimeToLocalStorage={saveTimeToLocalStorage}
      />
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{tasks}</ul>
    </section>
  );
}

TaskList.defaultProps = {
  handleDelete: () => {},
  handleEdit: () => {},
  onToggleDone: () => {},
  onToggleEditing: () => {},
  saveTimeToLocalStorage: () => {},
};

TaskList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEditing: PropTypes.func,
  saveTimeToLocalStorage: PropTypes.func,
};

export default TaskList;
