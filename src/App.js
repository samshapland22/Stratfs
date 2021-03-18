import './App.css';
import React from 'react';
import { Table } from './Table';
import AddModal from './AddModal';
import RemoveModal from './RemoveModal';

// const url =
//   'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';

const url = 'http://localhost:9000';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      data: [],
      isOpen: false,
      removeOpen: false,
      creditor: '',
      first: '',
      last: '',
      minPercentage: 0,
      balance: 0,
    };
    this.getTableData = this.getTableData.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.getCheckCount = this.getCheckCount.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      data: data.map((user) => {
        if (!user.hasOwnProperty('selected')) {
          user.selected = true;
        }
        return user;
      }),
      isLoading: false,
    });
  }

  getTableData() {
    return this.state.data.map((user) => {
      return (
        <tr
          key={user.id}
          style={
            user.selected
              ? { backgroundColor: 'white' }
              : { backgroundColor: '#D8DEE2' }
          }
        >
          <th className='checkbox' style={{ backgroundColor: 'white' }}>
            <div className='checkbox-container'>
              <input
                type='checkbox'
                checked={user.selected}
                onChange={() => {
                  this.setState({
                    data: this.state.data.map((data) => {
                      if (user.id === data.id) {
                        data.selected = !data.selected;
                      }
                      return data;
                    }),
                  });
                }}
              />
              <div className='checkbox-box' />
            </div>
          </th>
          <td className='tdLeft'>{user.creditorName}</td>
          <td className='tdLeft'>{user.firstName}</td>
          <td className='tdLeft'>{user.lastName}</td>
          <td className='tdRight'>{user.minPaymentPercentage}</td>
          <td className='tdRight'>{user.balance}.00</td>
        </tr>
      );
    });
  }

  getTotal() {
    return this.state.data
      .filter((user) => user.selected === true)
      .map((user) => Number.parseFloat(user.balance))
      .reduce((acc, val) => acc + val, 0)
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }

  getCheckCount() {
    const checks = this.state.data.filter((user) => user.selected === true);
    return checks.length;
  }

  handleCheck(event) {
    let checked = event.target.checked;
    this.setState({
      data: this.state.data.map((user) => {
        user.selected = checked;
        return user;
      }),
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault(event);
    let newId;
    if (this.state.data.length) {
      newId = this.state.data[this.state.data.length - 1].id + 1;
    } else {
      newId = 1;
    }

    const newRow = {
      'id': newId,
      'creditorName': this.state.creditor,
      'firstName': this.state.first,
      'lastName': this.state.last,
      'minPaymentPercentage': Number(this.state.minPercentage),
      'balance': Number(this.state.balance),
      'selected': true,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'Access-Control-Request-Method': '*',
      },
      body: JSON.stringify([...this.state.data, newRow]),
    });
    const data = await response.json();

    console.log('data', data);

    this.setState({
      data: [...this.state.data, newRow],
      isOpen: false,
    });
  }

  async handleRemove() {
    const rowsToKeep = this.state.data.filter((user) => !user.selected);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowsToKeep),
    });
    const data = await response.json();

    console.log(data);

    this.setState({
      data: this.state.data.filter((user) => !user.selected),
      removeOpen: false,
    });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <>
          <div className='Table'>
            <Table
              getTableData={this.getTableData}
              handleCheck={this.handleCheck}
            />

            <div className='buttons'>
              <button onClick={() => this.setState({ isOpen: true })}>
                Add Debt
              </button>
              <button
                onClick={() => this.setState({ removeOpen: true })}
                disabled={!this.getCheckCount()}
              >
                Remove Debt
              </button>
            </div>

            <div className='total'>
              <span id='totalTitle'>Total</span>
              <span id='totalNumber'>${this.getTotal()}</span>
            </div>

            <div className='count'>
              <span id='rowCount'>
                Total Row Count: {this.state.data.length}
              </span>
              <span id='checkedCount'>
                Checked Row Count: {this.getCheckCount()}
              </span>
            </div>
          </div>
          <AddModal
            open={this.state.isOpen}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            onClose={() => this.setState({ isOpen: false })}
          />
          <RemoveModal
            open={this.state.removeOpen}
            handleRemove={this.handleRemove}
            getCheckCount={this.getCheckCount}
            onClose={() => this.setState({ removeOpen: false })}
          />
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default App;
