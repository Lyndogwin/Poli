import React from 'react';
import axios from 'axios';
import Politician from '../../components/Politician';
import DropDown from '../../components/DropDown';


class Test extends React.Component {
  state = {
    search: "",
    politicians: []
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
      `http://localhost:4000/politicians/`
    )
    .then(response => {
      this.setState({politicians: response.data})
      console.log(this.state.politicians);
      population = response;
    })
    .catch(err => {
      console.log(err);
    })
  }

  render () {
    return (
      <div>
        <div className="title card">
          <h1>Test</h1>
          <form onSubmit={this.runSearch}>
            <label>Search a Politician  </label>
            <input type="text" value={this.state.search} onChange={(e) => this.handleInput(e.target.value)}/>
            <DropDown title="Select Politician" list={this.state.politicians}/>
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