import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
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

  const createTask = (label) => ({
    label,
    done: false,
    editing: false,
    creationDate: String(new Date()),
    id: uuidv4(),
  });

  const toggleProp = (arr, id, propName) =>
    arr.map((el) => {
      if (el.id === id) {
        return { ...el, [propName]: !el[propName] };
      }
      return el;
    });

  const updateTime = (arr, id, minutes, seconds) =>
    arr.map((el) => {
      if (el.id === id) {
        return { ...el, minutes, seconds };
      }
      return el;
    });

  const handleDelete = (id) => {
    const filteredTodos = todoData.filter((todo) => todo.id !== id);

    setTodoData(filteredTodos);
  };

  const handleAdd = (label) => {
    const newTask = createTask(label);

    setTodoData((prevData) => [...prevData, newTask]);
  };

  const handleEdit = (id, text) => {
    const newTodos = [...todoData].map((todo) => {
      if (todo.id === id) {
        const item = todo;
        item.label = text;
      }
      return todo;
    });

    setTodoData(newTodos);
  };

  const onToggleDone = (id) => {
    const done = toggleProp(todoData, id, 'done');

    setTodoData(done);
  };

  const onToggleEditing = (id) => {
    setTodoData(toggleProp(todoData, id, 'editing'));
  };

  const onFilterChange = (filterStatus) => {
    setFilter(filterStatus);
  };

  const clearCompleted = () => {
    const completedTasks = todoData.filter((todo) => !todo.done);

    setTodoData(completedTasks);
  };

  const saveTimeToLocalStorage = (id, minutes, seconds) => {
    const uodatedTime = updateTime(todoData, id, minutes, seconds);

    setTodoData(uodatedTime);
  };

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

  const itemsDone = todoData.filter((todo) => todo.done).length;
  const itemsLeft = todoData.length - itemsDone;
  const filteredTasks = filterTasks(todoData, filter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm handleAdd={handleAdd} />
      </header>
      <TaskList
        todos={filteredTasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        onToggleDone={onToggleDone}
        onToggleEditing={onToggleEditing}
        saveTimeToLocalStorage={saveTimeToLocalStorage}
      />
      <Footer
        itemsLeft={itemsLeft}
        clearCompleted={clearCompleted}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </section>
  );
}

export default App;
