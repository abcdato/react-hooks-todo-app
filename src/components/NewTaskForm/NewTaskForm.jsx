import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ handleAdd }) {
  const [todo, setTodo] = useState('');

  const onChange = (e) => {
    const todoField = e.target.value;
    setTodo(todoField);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() === '') {
      setTodo('');
      return;
    }

    handleAdd(todo.trim());
    setTodo('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        type="text"
        name="label"
        value={todo}
        onChange={onChange}
      />
      <input className="visually-hidden" type="submit" value="Submit" />
    </form>
  );
}

export default NewTaskForm;

NewTaskForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};

// export default class NewTaskForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       label: '',
//     };
//   }

// onChange = (e) => {
//   this.setState({
//     [e.target.name]: e.target.value,
//   });
// };

// onSubmit = (e) => {
//   e.preventDefault();

//   const { label } = this.state;
//   const { handleAdd } = this.props;

//   if (label.trim() === '') {
//     this.setState({
//       label: '',
//     });
//     return;
//   }

//   handleAdd(label);

//   this.setState({
//     label: '',
//   });
// };

// render() {
//   const { label } = this.state;

//     return (
//       <form className="new-todo-form" onSubmit={this.onSubmit}>
//         <input
//           className="new-todo"
//           placeholder="What needs to be done?"
//           type="text"
//           name="label"
//           value={label}
//           onChange={this.onChange}
//         />
//         <input className="visually-hidden" type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
