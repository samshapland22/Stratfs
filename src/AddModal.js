import React from 'react';
import Form from './Form';

export default function AddModal({
  open,
  onClose,
  handleSubmit,
  handleChange,
}) {
  if (!open) return null;
  return (
    <>
      <div className='overlay' />
      <div className='modal' id='addModal'>
        <button onClick={onClose} id='xButton'>
          X
        </button>
        <Form handleSubmit={handleSubmit} handleChange={handleChange} />
      </div>
    </>
  );
}
