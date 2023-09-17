/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import Task from '../Task/Task';
import DataContext from '../Context/DataContext';

function TaskList() {
  const { filteredTasks } = useContext(DataContext);
  const tasks = filteredTasks.map((item) => {
    const { id, ...itemProps } = item;

    return <Task key={id} id={id} {...itemProps} />;
  });

  return (
    <main className="main">
      <ul className="todo-list">{tasks}</ul>
    </main>
  );
}

export default TaskList;
