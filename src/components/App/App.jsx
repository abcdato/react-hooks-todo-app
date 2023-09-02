import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import '../../index.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todoData: [],
      filter: 'all',
    };
  }

  componentDidMount() {
    const todoData = JSON.parse(localStorage.getItem('todoData')) || [];
    const filter = JSON.parse(localStorage.getItem('filter')) || 'all';

    this.setState({
      todoData,
      filter,
    });
  }

  componentDidUpdate() {
    const { todoData, filter } = this.state;

    localStorage.setItem('todoData', JSON.stringify(todoData));
    localStorage.setItem('filter', JSON.stringify(filter));
  }

  createTask = (label) => ({
    label,
    done: false,
    editing: false,
    creationDate: String(new Date()),
    id: uuidv4(),
  });

  toggleProp = (arr, id, propName) =>
    arr.map((el) => {
      if (el.id === id) {
        return { ...el, [propName]: !el[propName] };
      }
      return el;
    });

  updateTime = (arr, id, minutes, seconds) =>
    arr.map((el) => {
      if (el.id === id) {
        return { ...el, minutes, seconds };
      }
      return el;
    });

  handleDelete = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((todo) => todo.id !== id),
    }));
  };

  handleAdd = (label) => {
    const newTask = this.createTask(label);

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }));
  };

  handleEdit = (id, text) => {
    this.setState(({ todoData }) => {
      const newTodos = [...todoData].map((todo) => {
        if (todo.id === id) {
          const item = todo;
          item.label = text;
        }
        return todo;
      });
      return {
        todoData: newTodos,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProp(todoData, id, 'done'),
    }));
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProp(todoData, id, 'editing'),
    }));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const completedTasks = todoData.filter((todo) => !todo.done);

      return {
        todoData: completedTasks,
      };
    });
  };

  saveTimeToLocalStorage = (id, minutes, seconds) => {
    this.setState(({ todoData }) => ({
      todoData: this.updateTime(todoData, id, minutes, seconds),
    }));
  };

  filterTasks = (todos, filter) => {
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

  render() {
    const { todoData, filter } = this.state;

    const itemsDone = todoData.filter((todo) => todo.done).length;
    const itemsLeft = todoData.length - itemsDone;
    const filteredTasks = this.filterTasks(todoData, filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm handleAdd={this.handleAdd} />
        </header>
        <TaskList
          todos={filteredTasks}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          onToggleDone={this.onToggleDone}
          onToggleEditing={this.onToggleEditing}
          saveTimeToLocalStorage={this.saveTimeToLocalStorage}
        />
        <Footer
          itemsLeft={itemsLeft}
          clearCompleted={this.clearCompleted}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </section>
    );
  }
}
