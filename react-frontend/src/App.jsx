import { useEffect, useState, useRef } from 'react'
import './App.css'
import NewTodoForm from './components/NewTodoForm'
import TodoList from './components/TodoList'

function App() {
  const inputRef = useRef(null)
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null)
      return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleClick () {
    inputRef.current.click()
  }

  function handleFileChange (event) {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj)
      return

    const reader = new FileReader()
    reader.onload = async (event) => { 
      const text = (event.target.result)
      setTodos(JSON.parse(text))
    }
    reader.readAsText(event.target.files[0])
    event.target.value = null //reset file input
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          return {...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
      ...currentTodos,
      {id:crypto.randomUUID(), title, completed: false},
      ]
    })
  }

  function editTodo(id, title) {
    console.log(title)
    deleteTodo(id)
    addTodo(title)
  }

  function exportTodos() {
    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(todos)], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "Todos.txt"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className='header'>Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
      {todos.length > 0 ?
      <>
        <button className='btn' style={{marginTop: 6, marginRight: 5}} onClick={() => exportTodos()}>Export</button>
      </>
      : <></>}
      <input style={{display: 'none'}} ref={inputRef} type="file" onChange={handleFileChange}/>
      <button className='btn' style={{marginTop: 6}} onClick={handleClick}>Import</button>
    </>
  )
}

export default App
