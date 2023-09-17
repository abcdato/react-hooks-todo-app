/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../App/App';

function TasksFilter({ onFilterChange }) {
  const buttons = [
    { status: 'all', label: 'All' },
    { status: 'active', label: 'Active' },
    { status: 'completed', label: 'Completed' },
  ];

  const { filter } = useContext(DataContext);

  const button = buttons.map(({ status, label }) => {
    const selected = filter === status;
    const className = selected ? 'selected' : '';

    return (
      <li key={status}>
        <button
          className={className}
          onClick={() => onFilterChange(status)}
          type="button"
        >
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{button}</ul>;
}

TasksFilter.defaultProps = {
  // filter: 'all',
};

TasksFilter.propTypes = {
  // filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
