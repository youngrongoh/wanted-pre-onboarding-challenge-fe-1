import http from './http';

interface HttpCreateTodo {
  Request: {
    title: string;
    content: string;
  };
  Response: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const createTodo = async (todo: HttpCreateTodo['Request']): Promise<HttpCreateTodo['Response']> => {
  const res = await http.post('/todos', todo);
  return res.data;
}