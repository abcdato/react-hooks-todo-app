/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import { DataContext } from '../App/App';

function TaskList({
  // todos,
  handleDelete,
  handleEdit,
  onToggleDone,
  onToggleEditing,
}) {
  const { filteredTasks } = useContext(DataContext);
  const tasks = filteredTasks.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        handleDelete={() => handleDelete(id)}
        handleEdit={handleEdit}
        onToggleDone={() => onToggleDone(id)}
        onToggleEditing={() => onToggleEditing(id)}
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
  // filteredTasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEditing: PropTypes.func,
  saveTimeToLocalStorage: PropTypes.func,
};

export default TaskList;
