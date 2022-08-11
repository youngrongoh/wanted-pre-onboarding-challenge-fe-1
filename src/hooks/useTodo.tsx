import { useMutation } from '@tanstack/react-query';
import { createTodo } from '../api/todo';

const useTodo = () => {
  const { mutateAsync: requestCreateTodo } = useMutation(['create', 'todo'], (todo: Parameters<typeof createTodo>[0]) => createTodo(todo));

  const add = async (todo: Parameters<typeof createTodo>[0]) => {
    const created = await requestCreateTodo(todo);
    return created;
  }

  return { 
    add,
  }
}

export default useTodo;