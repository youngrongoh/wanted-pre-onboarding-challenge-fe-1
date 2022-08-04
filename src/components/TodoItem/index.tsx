import React, { useState } from 'react'
import EditableText from '../EditableText';
import Toggle from '../Toggle';

interface ITodoItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  remove: (id: string) => void;
  update: (id: string, data: { title: string, content: string }) => void;
}

const TodoItem = ({ id, title, content, createdAt, updatedAt, remove, update }: ITodoItem) => {
  const [mode, setMode] = useState<React.ComponentProps<typeof EditableText>['mode']>('normal');
  const [todo, setTodo] = useState({ title, content });
  const [showsDetail, setShowsDetail] = useState<boolean>(false);

  const toggleDetail = () => {
    setShowsDetail(prev => !prev);
  }

  const onChange = (field: 'title' | 'content') => (value: string) => {
    setTodo(prev => ({ ...prev, [field]: value }));
  };

  const onEditClicked = () => {
    if (mode === 'edit') {
      update(id, { title: todo.title, content: todo.content });
      setMode('normal');
    } else {
      setMode('edit');
    }
  };

  const onRemoveClicked = () => {
    remove(id);
  };

  const onCancelClicked = () => {
    setTodo(prev => ({ ...prev, title, content }))
    setMode('normal');
  }

  return (
    <div>
      <Toggle open={showsDetail} onClick={toggleDetail} />
      <div>
        <EditableText mode={mode} onChange={onChange('title')}>{todo.title}</EditableText>
        {mode === 'normal' && <button onClick={onRemoveClicked}>🗑</button>}
        {mode === 'edit' && <button onClick={onCancelClicked}>❌</button>}
        <button onClick={onEditClicked}>✏️</button>
      </div>
      {showsDetail && (
        <div>
          <EditableText mode={mode} onChange={onChange('content')}>{todo.content}</EditableText>
          <div>{createdAt}</div>
          <div>{updatedAt}</div>
        </div>
      )}
    </div>
  )
}

export default TodoItem;