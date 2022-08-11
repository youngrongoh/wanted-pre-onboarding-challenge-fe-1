import http from './http';

export type Todo = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

interface HttpCreateTodo {
  Request: {
    title: string;
    content: string;
  };
  Response: Todo;
}

export const createTodo = async (todo: HttpCreateTodo['Request']): Promise<HttpCreateTodo['Response']> => {
  const res = await http.post('/todos', todo);
  return res.data;
}

interface HttpGetTodos {
  Response: Todo[];
}

export const getTodos = async (): Promise<HttpGetTodos['Response']> => {
  const res = await http.get('/todos');
  return res.data?.data;
}