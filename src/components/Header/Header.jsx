/* eslint-disable import/no-cycle */
import React from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

function Header() {
  return (
    <>
      <h1>todos</h1>
      <header className="header">
        <NewTaskForm />
      </header>
    </>
  );
}

export default Header;
