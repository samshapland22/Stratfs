import React from 'react';

export default function Form({ handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='formGroup'>
        <label htmlFor='creditor'>Creditor</label>
        <input
          className='formControl'
          name='creditor'
          onChange={handleChange}
        />
      </div>
      <div className='formGroup'>
        <label htmlFor='first name'>First Name</label>
        <input className='formControl' name='first' onChange={handleChange} />
      </div>
      <div className='formGroup'>
        <label htmlFor='last name'>Last Name</label>
        <input className='formControl' name='last' onChange={handleChange} />
      </div>
      <div className='formGroup'>
        <label htmlFor='minimum payment percentage'>Minimum Payment %</label>
        <input
          className='formControl'
          name='minPercentage'
          type='number'
          onChange={handleChange}
        />
      </div>
      <div className='formGroup'>
        <label htmlFor='balance'>Balance $</label>
        <input
          className='formControl'
          name='balance'
          type='number'
          onChange={handleChange}
        />
      </div>
      <div className='formGroup'>
        <button className='submitButton' type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
}
