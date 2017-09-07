import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import TodoList from '../components/TodoList'
import CreateTodoForm from '../components/CreateTodoForm'

class TodosContainer extends Component {
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.todos
      })
    })
  }
    
    createTodo(newBody) {
      let newTodo = {
        body: newBody,
        completed: false
      }
      TodoModel.create(newTodo).then((res) => {
        console.log('created todo', res)
        let todos = this.state.todos
        let newTodos = todos.push(res)
        this.setState({newTodos})
      })
    }

  deleteTodo(todo){
    console.log('deleting', todo)
    TodoModel.delete(todo).then((res) => {
      let todos = this.state.todos.filter(function(todo) {
        return todo._id !== res._id
      });
      this.setState({todos})
    })
  }

  updateTodo(todo, id){
    console.log(todo)
    console.log(id)
    let newTodo = {
      _id: id,
      body: todo,
      completed: false
    }
    TodoModel.update(newTodo).then((res) => {
      let todos = this.state.todos.filter(function(todo) {
        return todo._id === res._id
      });
      this.setState({todos})
    })
  }
  
  render(){
    return (
      <div className='todosContainer'>
      <CreateTodoForm createTodo={this.createTodo.bind(this)} />
        <h2>This is the todos container</h2>
        <TodoList
          todos={this.state.todos}
          onDeleteTodo={this.deleteTodo.bind(this)}
          onUpdateTodo={this.updateTodo.bind(this)}  />
      </div>
    )
  }
}

export default TodosContainer