import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from "react-beautiful-dnd";

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import { Todo } from './model';

import './styles.css';

type Props = {
  todo: Todo;
  index: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const SingleTodo = ({todo, todos, setTodos, index}: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDone = (id:number) => {
    if(!edit) {
      setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
    }
    
  }
  const handleDelete = (id:number) => {
    setTodos(todos.filter(todo => todo.id !== id ))
  }

  const handleEdit = () => {   
    if(!edit && !todo.isDone) {
      setEdit(!edit)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])
  

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(todos.map(todo => (todo.id === id ? {...todo, todo: editTodo} : todo)))
    setEdit(false);
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleSubmit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
 
  )
}

export default SingleTodo