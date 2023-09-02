import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor(props) {
    super(props);

    const { label } = this.props;

    this.state = {
      inputValue: label,
    };
  }

  onChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { inputValue } = this.state;
    const { id, handleEdit, handleDelete, onToggleEditing } = this.props;

    if (inputValue.trim() === '') {
      handleDelete();
      return;
    }
    handleEdit(id, inputValue);
    onToggleEditing(id);
  };

  render() {
    const {
      label,
      handleDelete,
      onToggleDone,
      onToggleEditing,
      done,
      editing,
      creationDate,
    } = this.props;
    const { inputValue } = this.state;

    const timeCreated = formatDistanceToNow(new Date(creationDate), {
      includeSeconds: true,
    });

    let className;

    if (done) {
      className = 'completed';
    } else if (editing) {
      className = 'editing';
    } else {
      className = 'active';
    }

    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={onToggleDone}
          />
          <label>
            <span className="title">{label}</span>
            <span className="description">created {timeCreated} ago</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={onToggleEditing}
            type="button"
            aria-label="edit"
          />
          <button
            className="icon icon-destroy"
            onClick={handleDelete}
            type="button"
            aria-label="delete"
          />
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            value={inputValue}
            onChange={this.onChange}
          />
        </form>
      </li>
    );
  }
}

Task.defaultProps = {
  id: '',
  label: 'Default task',
  done: false,
  editing: false,
  creationDate: String(new Date()),
};

Task.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  done: PropTypes.bool,
  editing: PropTypes.bool,
  creationDate: PropTypes.string,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
};
