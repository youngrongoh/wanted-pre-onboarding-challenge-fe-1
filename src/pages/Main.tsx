import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { useAuth } from '../hooks/useAuth';

interface IMain {
  
}

const Main = (props: IMain) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { isSignedIn } = auth.data;

  const onSignOutClicked = () => {
    auth.signOut();
    navigate('/auth');
  }

  return (
    <div>
      <nav>
        {isSignedIn ? <button onClick={onSignOutClicked}>로그아웃</button> : <Link to="/auth">로그인</Link>}
      </nav>
      <TodoList />
    </div>
  )
}

export default Main;