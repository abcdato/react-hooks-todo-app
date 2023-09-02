import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { label } = this.state;
    const { handleAdd } = this.props;

    if (label.trim() === '') {
      this.setState({
        label: '',
      });
      return;
    }

    handleAdd(label);

    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          name="label"
          value={label}
          onChange={this.onChange}
        />
        <input className="visually-hidden" type="submit" value="Submit" />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};
