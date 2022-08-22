import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import Todo from "../components/Todo";

const sampleTodos = [
  { id: 0, content: "content1", label: "label1", completed: false},
  { id: 1, content: "content2", label: "label2", completed: false},
  { id: 2, content: "content3", label: "label1", completed: false},
];

const TodoList = () => {
  const [todos, setTodos] = useState(sampleTodos)
  const [hasNewTodo, setHasNewTodo] = useState(false)
  const UlRef = useRef()
  useEffect(()=> {
    setHasNewTodo(false)
  }, [hasNewTodo])
  const handleDelete = (DeleteId) => {
    setTodos(prev => prev.filter(({id})=> id!==DeleteId))
  }
  const addTodo = () => {
    setTodos(prev => [...prev, 
      { id: nanoid(), content: "", label: "label1", completed: false}
    ])
    setHasNewTodo(true)
  }
  return (
    <>
      <h1>할일</h1>
      <ul ref={UlRef}>
        {todos
        .filter(({completed}) => !completed)
        .map(({ id, content }) => (
          <Todo
            key={id}
            content={content}
            onClickDeleteBtn={()=>handleDelete(id)}
            onEdit={hasNewTodo}
          ></Todo>
        ))}
      </ul>
      <button
      onClick={addTodo}
      >new todo</button>
    </>
  );
};

export default TodoList;
