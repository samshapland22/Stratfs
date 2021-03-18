import React from 'react';

export default function Modal({ open, onClose, handleRemove, getCheckCount }) {
  if (!open) return null;
  return (
    <>
      <div className='overlay' />
      <div className='modal'>
        <div className='modalText'>
          <p>Checked rows will be deleted from table.</p>
          <p>
            Are you sure you want to remove {getCheckCount()}{' '}
            {getCheckCount() > 1 ? 'rows' : 'row'}?
          </p>
        </div>
        <button onClick={handleRemove}>Remove Rows</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </>
  );
}
