import React from 'react'
import { useState } from 'react'

function NewTodoForm({onSubmit}) {
    
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (newItem === "")
            return 

        onSubmit(newItem)
        setNewItem("")
    }

  return (
    <form onSubmit={handleSubmit} className='new-item-form'>
      <div className='form-row'>
        <label htmlFor='item'>New Task</label>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} type='text' id='item' placeholder='Enter new Todo'/>
      </div>
      <button className='btn'>Add</button>
    </form>
  )
}

export default NewTodoForm