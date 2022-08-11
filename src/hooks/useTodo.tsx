import { useMutation, useQuery } from '@tanstack/react-query';
import { createTodo, getTodos, updateTodo } from '../api/todo';

const useTodo = () => {
  const { data: todos, refetch: reftchGetTodos } = useQuery(['get', 'todos'], () => getTodos());
  const { mutateAsync: requestCreateTodo } = useMutation(['create', 'todo'], (todo: Parameters<typeof createTodo>[0]) => createTodo(todo), {
    onSuccess: () => reftchGetTodos()
  });
  const { mutateAsync: requestUpdateTodo } = useMutation(['update', 'todo'], (param: Parameters<typeof updateTodo>[0]) => updateTodo(param), {
    onSuccess: () => reftchGetTodos()
  });

  const add = async (todo: Parameters<typeof createTodo>[0]) => {
    const created = await requestCreateTodo(todo);
    return created;
  }

  const update = async (todoId: Parameters<typeof updateTodo>[0]['todoId'], todo: Parameters<typeof updateTodo>[0]['todo']) => {
    const updated = await requestUpdateTodo({ todoId, todo });
    return updated;
  }
  
  return { 
    data: todos || [],
    add,
    update,
  }
}

export default useTodo;