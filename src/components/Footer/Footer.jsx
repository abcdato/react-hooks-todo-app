/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import DataContext from '../Context/DataContext';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer() {
  const { itemsLeft, todoData, setTodoData } = useContext(DataContext);

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
