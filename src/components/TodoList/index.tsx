import React, { useEffect, useState } from 'react'
import { Todo } from '../../api/todo';
import useTodo from '../../hooks/useTodo';
import TodoItem from '../TodoItem';

interface ITodoList {
  
}

const TodoList = (props: ITodoList) => {
  const todo = useTodo();
  const [data, setData] = useState(todo.data);

  useEffect(() => {
    setData(todo.data);
  }, [todo])

  const onAddClicked = () => {
    const newTodo: Todo = {
      title: '할 일을 입력하세요.', 
      content: '', 
      id: Date.now().toString(32), 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    todo.add(newTodo);
  }

  const update = (id: string, data: { title: string, content: string }) => {
    todo.update(id, data);
  }

  const remove = (id: string) => {
    setData(prev => 
      [...prev].filter((item) => item.id !== id)
    );
  }

  return (
    <div>
      <header>Todos</header>
      <section>
        <ul>
        {data.map((item) => (
          <li key={item.id}>
            <TodoItem {...item} update={update} remove={remove} />
          </li>
        ))}
        </ul>
        <div>
          <button onClick={onAddClicked}>➕</button>
        </div>
      </section>
    </div>
  )
}

export default TodoList;