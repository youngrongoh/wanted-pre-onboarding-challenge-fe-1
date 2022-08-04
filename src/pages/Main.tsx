import React from 'react'
import { Link } from 'react-router-dom';
import TodoList from '../components/TodoList';

interface IMain {
  
}

const Main = (props: IMain) => {
  
  return (
    <div>
      <nav>
        <Link to="/auth">로그인</Link>
      </nav>
      <TodoList />
    </div>
  )
}

export default Main;