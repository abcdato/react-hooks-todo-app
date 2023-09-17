/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../App/App';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({ onFilterChange }) {
  const { itemsLeft, todoData, setTodoData } = useContext(DataContext);

  const clearCompleted = () => {
    const completedTasks = todoData.filter((todo) => !todo.done);

    setTodoData(completedTasks);
  };

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter onFilterChange={onFilterChange} />
      <button
        className="clear-completed"
        onClick={clearCompleted}
        type="button"
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  // itemsLeft: 3,
  // filter: 'all',
  onFilterChange: () => {},
};

Footer.propTypes = {
  // itemsLeft: PropTypes.number,
  // filter: PropTypes.string,
  // clearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func,
};

export default Footer;
