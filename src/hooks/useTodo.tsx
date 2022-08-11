import { useMutation, useQuery } from '@tanstack/react-query';
import { createTodo, getTodos } from '../api/todo';

const useTodo = () => {
  const { data: todos, refetch: reftchGetTodos } = useQuery(['get', 'todos'], () => getTodos());
  const { mutateAsync: requestCreateTodo } = useMutation(['create', 'todo'], (todo: Parameters<typeof createTodo>[0]) => createTodo(todo), {
    onSuccess: () => reftchGetTodos()
  });

  const add = async (todo: Parameters<typeof createTodo>[0]) => {
    const created = await requestCreateTodo(todo);
    return created;
  }
  
  return { 
    data: todos || [],
    add,
  }
}

export default useTodo;