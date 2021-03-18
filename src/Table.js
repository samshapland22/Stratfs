import React from 'react';

export const Table = (props) => {
  const { getTableData, handleCheck } = props;

  return (
    <>
      <h1>Account Data</h1>
      <table>
        <thead>
          <tr>
            <th className='checkbox'>
              <div className='checkbox-container'>
                <input type='checkbox' onChange={handleCheck} defaultChecked />
                <div className='checkbox-box' id='main-checkbox' />
              </div>
            </th>
            <th className='thLeft'>Creditor</th>
            <th className='thLeft'>First Name</th>
            <th className='thLeft'>Last Name</th>
            <th className='thRight'>Min Pay%</th>
            <th className='thRight'>Balance</th>
          </tr>
        </thead>
        <tbody>{getTableData()}</tbody>
      </table>
    </>
  );
};
