/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import DataContext from '../Context/DataContext';

function TasksFilter() {
  const { filter, setFilter } = useContext(DataContext);

  const buttons = [
    { btn: 'all', label: 'All' },
    { btn: 'active', label: 'Active' },
    { btn: 'completed', label: 'Completed' },
  ];

  const button = buttons.map(({ btn, label }) => {
    const selected = filter === btn;
    const className = selected ? 'selected' : '';

    return (
      <li key={btn}>
        <button
          className={className}
          onClick={() => setFilter(btn)}
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
