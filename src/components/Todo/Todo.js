import React from "react";
import axios from "axios";
import {FaTrash} from 'react-icons/lib/fa';
import {FaPencil} from 'react-icons/lib/fa';

class Todo extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            newTodo: '',
            username: '',
            password: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    componentDidMount() {
        axios.post('http://localhost:4300/api/getTodos')
          .then(response => {
              let data = response.data;
              data.forEach(todo => {
                for(let key in todo) {
                  if(key === 'todo') {
                    this.setState({
                      todos: [...this.state.todos, todo[key]],
                      newTodo: ''
                    })
                  }
                }
              })
          })
    }
    
    handleClick(e) {
        e.preventDefault();
        axios.post('http://localhost:4300/api/saveTodo', {
            newTodo: this.state.newTodo
        })
        .then(response => { 
            if (response.status === 200) {
                this.setState({
                    todos: [...this.state.todos, this.state.newTodo],
                    newTodo: ''
                })
            } else {
                console.log('here')
                alert('Error. Enter again.')
            } 
        })
        .catch(error => {
            console.error(error)
        })
    }
    handleLogin(e) {
        e.preventDefault();
        axios.post('http://localhost:4300/api/checkUsername', {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            if(response.status === 200) {
                console.log('here!')
                console.log(response.data)
            }
            else {
                alert('Error signing up. This username and password may already exist in database')
            }
        })
        .catch(error => {
            console.error(error)
        })
    }
    deleteHandler(i) {
        axios.post('http://localhost:4300/api/deleteTodo', {
            todo: this.state.todos[i]
        })
        .then(response => {
            if (response.status === 200) {
            this.setState({
                todos: [...this.state.todos.slice(0, i).concat(this.state.todos.slice(i + 1))]
            })
        } else {
            alert('Error deleting todo')
            }
        })
        .catch(error => {
            console.error(error)
        })
    }
    updateHandler(i) {
        axios.post('http://localhost:4300/api/updateTodo', {
            todo: this.state.todos[i]
        })
        .then(response => {
            if(response.status === 200) {
                this.setState({
                  todos: [...this.state.todos.slice(0, i).concat(response.data['todo']).concat(this.state.todos.slice(i + 1))]
                })
        } else {
            alert('Error updating todo')
            }
        })
        .catch(error => {
            console.error(error)
        })
    }  
    inputChangeHandler(e) {
        this.setState({
            newTodo: e.target.value        
        })
    }
    inputUsernameHandler(e) {
        this.setState({
            username: e.target.value
        })
    }
    inputPasswordHandler(e) {
        this.setState({
            password: e.target.value
        })
    }
    render() {
        return (

            <div className="App">
                <form>
                <label className='label'>
                    <li className='inputs'><input type="text" value={this.state.username} onChange={event => this.inputUsernameHandler(event)} placeholder='username' />
                    <input type="text" value={this.state.password} onChange={event => this.inputPasswordHandler(event)} placeholder='password'/>
                    <button onClick={this.handleLogin.bind(this)}>SignUp / Login</button>
                    </li>
                 <input type="text" value={this.state.newTodo} onChange={event => this.inputChangeHandler(event)} placeholder='add task'/>
                </label>
                <button onClick={this.handleClick.bind(this)}>Submit</button>
                </form>
                <ul className='ul'>
                    {this.state.todos.map((todo, i) => {
                        return <li key={i} complete="false">{todo}
                        <FaTrash onClick={this.deleteHandler.bind(this, i)}/>
                        <FaPencil id='button'onClick={this.updateHandler.bind(this, i)}/>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
 }

export default Todo;
