import React , { Component } from 'react'
// import  from 'react/cjs/react.production.min'


class TodoForm extends Component {

  state =  {
    val: "",
  }

  handleChange(event){ 
    this.setState({val: event.target.value})
  }

  handleAddTodo() {
    this.props.addTodo(this.state.val)
    this.setState({val: ''})
  }

  render() {
    return (
        <form className='mt-3'>
          <div className='form-group'>
            <input 
            type='text'
            className='form-control'
            name='val'
            id='todo'
            value={this.state.val}
            onChange={this.handleChange.bind(this)}
            />
            <button type='button' className='btn btn-primary' onClick={this.handleAddTodo.bind(this)}>
              
              Add</button>
          </div>
        </form>
    )
  }
}

export default TodoForm;