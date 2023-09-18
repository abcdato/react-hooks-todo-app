/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import DataContext from '../Context/DataContext';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import '../../index.css';

function App() {
  const [todoData, setTodoData] = useState(
    () => JSON.parse(localStorage.getItem('todoData')) || [],
  );

  const [filter, setFilter] = useState(
    () => JSON.parse(localStorage.getItem('filter')) || 'all',
  );

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [todoData, filter]);

  const filterTasks = (todos) => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.done);
      case 'completed':
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  };

  const filteredTasks = filterTasks(todoData, filter);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    filteredTasks,
    filter,
    setFilter,
    todoData,
    setTodoData,
  };

  return (
    <section className="todoapp">
      <DataContext.Provider value={value}>
        <Header />
        <TaskList />
        <Footer />
      </DataContext.Provider>
    </section>
  );
}

export default App;
