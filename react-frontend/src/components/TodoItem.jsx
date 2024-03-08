import React, { useState } from 'react'

function TodoItem({completed, id, title, toggleTodo, deleteTodo, editTodo}) {
  const [edit, setEdit] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  return (
    <li>
      {!edit ? 
        <>
          <label>
          <input type='checkbox' checked={completed} onChange={e => toggleTodo(id, e.target.checked)}/>
          {title}
          </label>
          <button className='btn btn-danger' onClick={() => deleteTodo(id)}>Delete</button>
          <button className='btn' onClick={() => setEdit(true)}>Edit</button>
        </>
        :
        <>
          <input type='text' id='edit' value={editTitle} onChange={e => setEditTitle(e.target.value)}/>
          <button className='btn' onClick={() => {setEdit(false); editTodo(id, editTitle)}}>Save</button>
          <button className='btn' onClick={() => {setEdit(false)}}>Cancel</button>
        </>
      }
    </li>
  )
}

export default TodoItem