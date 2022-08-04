import React, { useEffect, useState } from 'react'

interface IToggle {
  open: boolean;
  onClick: () => void;
}

const Toggle = ({ open: injectedOpen, onClick }: IToggle) => {
  const [open, setOpen] = useState(injectedOpen);

  useEffect(() => {
    if (injectedOpen == null) return;
    setOpen(injectedOpen);
  }, [injectedOpen]);

  const onButtonClick = () => {
    setOpen(prev => !prev);
    onClick();
  }
  return (
    <button onClick={onButtonClick}>
      {open ? '▸' : '▾'}
    </button>
  )
}

export default Toggle;