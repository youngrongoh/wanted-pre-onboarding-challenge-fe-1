import { useMutation, useQuery } from '@tanstack/react-query';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../api/todo';

const useTodo = () => {
  const { data: todos, refetch: reftchGetTodos } = useQuery(['get', 'todos'], () => getTodos());
  const { mutateAsync: requestCreateTodo } = useMutation(['create', 'todo'], (todo: Parameters<typeof createTodo>[0]) => createTodo(todo), {
    onSuccess: () => reftchGetTodos()
  });
  const { mutateAsync: requestUpdateTodo } = useMutation(['update', 'todo'], (param: Parameters<typeof updateTodo>[0]) => updateTodo(param), {
    onSuccess: () => reftchGetTodos()
  });
  const { mutateAsync: requestDeleteTodo } = useMutation(['delete', 'todo'], (todoId: Parameters<typeof deleteTodo>[0]) => deleteTodo(todoId), {
    onSuccess: () => reftchGetTodos()
  });

  const add = async (todo: Parameters<typeof createTodo>[0]) => {
    const created = await requestCreateTodo(todo);
    return created;
  }

  const edit = async (todoId: Parameters<typeof updateTodo>[0]['todoId'], todo: Parameters<typeof updateTodo>[0]['todo']) => {
    const updated = await requestUpdateTodo({ todoId, todo });
    return updated;
  }

  const remove = async (todoId: Parameters<typeof deleteTodo>[0]) => {
    const updated = await requestDeleteTodo(todoId);
    return updated;
  }
  
  return { 
    data: todos || [],
    add,
    edit,
    remove,
  }
}

export default useTodo;