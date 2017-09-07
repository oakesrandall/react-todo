import React, {Component} from 'react';

class EditTodoForm extends Component {

  constructor() {
    super()
    this.state = {
      updatedTodoBody: ''
    }
  }

  onInputChange(event){
    this.setState({
      updatedTodoBody: event.target.value
    })
  }

  onFormSubmit(event){
    event.preventDefault()
    console.log(this.state.updatedTodoBody)
    this.props.onUpdateTodo(this.state.updatedTodoBody, this.props.id)
    this.setState({
      updatedTodoBody:''
    })
  }

  render(){
    return (
      <div className='editTodoForm' >
        <form onSubmit={event => this.onFormSubmit(event)}>
          <input
            onChange={event => this.onInputChange(event)}
            placeholder='Write updated todo here...'
            type='text'
            value={this.state.updatedTodoBody} />
          <button type='submit'>Update Todo!</button>
        </form>
      </div>
    )
  }
}

export default EditTodoForm