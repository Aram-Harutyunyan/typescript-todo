import React, { useRef, useState } from 'react'
import { Todo } from './model'

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  
}
const InputFields = ({setTodos,todos}:Props) => {
  const [todo, setTodo] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if(todo){
     setTodos([...todos, { id: Date.now(), todo, isDone: false}]);
     setTodo("")
    }
   }

  return (
    <form 
    className='input' 
    onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur();
    }}>
      <input ref={inputRef} value={todo} onChange={(e) => setTodo(e.target.value)} type="input" placeholder="Enter a task" className="input__box" />
      <button type="submit" className="input_submit">Go</button>
    </form>
  )
}

export default InputFields