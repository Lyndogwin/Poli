import React from 'react';
import axios from 'axios';
import Politician from '../../components/Politician';
import DropDown from '../../components/DropDown';


class Test extends React.Component {
  state = {
    search: "",
    politicians: [],
    positions: []
  };

  runSearch = (event) => {
    // API request logic here with this.state.search
    event.preventDefault();
    console.log(this.state.search);

    // axios.defaults.baseURL = ''

    axios.get(
      `http://localhost:4000/reddit/${this.state.search}`
    )
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleInput = (e) => {
    this.setState({search: e});
  }

  componentDidMount = () => {
    let population = [];
    axios.get(
      `http://localhost:4000/politicians/init`
    )
    .then(response => {
      this.setState({politicians: response.data})
      console.log(this.state.politicians);
      population = response;
    })
    .catch(err => {
      console.log(err);
    })

    axios.get(
      `http://localhost:4000/positions/`
    )
    .then(response => {
      this.setState({positions: response.data})
      console.log(this.state.positions);
    })
    .catch(err => {
      console.log(err);
    })
  }

  filter = (val) => {
    axios.get(
      `http://localhost:4000/politicians/${val}`
    )
    .then(response => {
      this.setState({politicians: response.data})
      console.log(this.state.politicians);
    })
    .catch(err => {
      console.log(err);
    })
  }

  checkboxLimit = (count) => {
    var disable = false
    if (count >1) {
      disable = true;
    } 
    return disable
  }

  render () {
    return (
      <div>
        <div className="title card">
          <h1>Test</h1>
          <form onSubmit={this.runSearch}>
            <label>Test basic call to reddit via proxy http request</label>
            <input type="text" value={this.state.search} onChange={(e) => this.handleInput(e.target.value)}/>
            <DropDown title="Select Politician" list={this.state.politicians} checkbox={this.checkboxLimit}/>
          </form>

          <form>
            <label>Politician search</label>
            <select name='state'>
              {this.state.positions.map((item,i)=>(
                <option key={i} value={item.Running_Position} onClick={(e) => this.filter(e.target.value)}>{item.Running_Position}</option>
              ))}
            </select>
          </form>
        </div>
        
        <div className="comparison">
        </div>

        <div className="card">Hello there</div> 
      </div>
    )
  }
}
export default Test;
export {
  Test
}