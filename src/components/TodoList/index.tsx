import React from 'react'
import { Todo } from '../../api/todo';
import useTodo from '../../hooks/useTodo';
import TodoItem from '../TodoItem';

interface ITodoList {
  
}

const DEFAULT_TODO: Todo = {
  title: '할 일을 입력하세요.', 
  content: '', 
  id: Date.now().toString(32), 
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const TodoList = (props: ITodoList) => {
  const todo = useTodo();

  const onAddClicked = () => {
    todo.add(DEFAULT_TODO);
  }

  const update = (id: string, data: { title: string, content: string }) => {
    todo.edit(id, data);
  }

  const remove = (id: string) => todo.remove(id);

  return (
    <div>
      <header>Todos</header>
      <section>
        <ul>
        {todo.data.map((item) => (
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