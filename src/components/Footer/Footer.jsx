import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({ itemsLeft, clearCompleted, filter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
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
  itemsLeft: 3,
  filter: 'all',
  onFilterChange: () => {},
};

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  filter: PropTypes.string,
  clearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func,
};

export default Footer;
