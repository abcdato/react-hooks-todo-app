import React from 'react';
import PropTypes from 'prop-types';

function TasksFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const button = buttons.map(({ name, label }) => {
    const selected = filter === name;
    const className = selected ? 'selected' : null;

    return (
      <li key={name}>
        <button
          className={className}
          onClick={() => onFilterChange(name)}
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
  filter: 'all',
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
