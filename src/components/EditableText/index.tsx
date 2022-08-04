import React, { useEffect, useState } from 'react'

interface IEditableText {
  mode?: 'normal' | 'edit';
  children?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const EditableText = ({ mode = 'normal', children, defaultValue, onChange }: IEditableText) => {
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    if (children == null) return;
    setValue(children);
  }, [children])

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    const { value } = e.target;
    setValue(value);
    
    onChange(value);
  };

  return (
    <input value={value} disabled={mode !== 'edit'} onChange={_onChange} />
  )
}

export default EditableText;