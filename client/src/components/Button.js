import React from 'react';
import css from './button.module.css';

export default function Nav({ type, transaction, onDelete, onEdit }) {
  const handleClick = () => {
    type === 'delete' ? onDelete(transaction._id) : onEdit(transaction);
  };

  return (
    <div>
      <button onClick={handleClick} className={`material-icons ${css.button}`}>
        {type}
      </button>
    </div>
  );
}
