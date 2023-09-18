/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import DataContext from '../Context/DataContext';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer() {
  const { todoData, setTodoData } = useContext(DataContext);

  const itemsDone = todoData.filter((todo) => todo.done).length;
  const itemsLeft = todoData.length - itemsDone;

  const clearCompleted = () => {
    const completedTasks = todoData.filter((todo) => !todo.done);

    setTodoData(completedTasks);
  };

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter />
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

export default Footer;
