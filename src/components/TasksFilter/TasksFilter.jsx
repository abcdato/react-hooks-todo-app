/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import DataContext from '../Context/DataContext';

function TasksFilter() {
  const buttons = [
    { status: 'all', label: 'All' },
    { status: 'active', label: 'Active' },
    { status: 'completed', label: 'Completed' },
  ];

  const { filter, setFilter } = useContext(DataContext);

  const onFilterChange = (filterStatus) => {
    setFilter(filterStatus);
  };

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

export default TasksFilter;
