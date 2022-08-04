import React, { useState } from 'react'
import TodoItem from '../TodoItem';

interface ITodoList {
  
}

const TodoList = (props: ITodoList) => {
  const dummy = [
    {
      title: "hi",
      content: "hello",
      id: "z3FGrcRL55qDCFnP4KRtn",
      createdAt: "2022-07-24T14:15:55.537Z",
      updatedAt: "2022-07-24T14:15:55.537Z"
    },
    {
      title: "hello",
      content: "world",
      id: "a2FsAa2DFd54f1nf1GR1g",
      createdAt: "2022-07-24T14:15:55.537Z",
      updatedAt: "2022-07-24T14:15:55.537Z"
    }
  ];
  const [data, setData] = useState(dummy);

  const onAddClicked = () => {
    setData(prev => [
      ...prev, 
      {
        title: '할 일을 입력하세요.', 
        content: '', 
        id: Date.now().toString(32), 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  }

  const update = (id: string, data: { title: string, content: string }) => {
    const { title, content } = data;
    setData(prev => 
      [...prev].map((item) => {
        if (item.id !== id) return item;
        return {...item, title, content };
      })
    )
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