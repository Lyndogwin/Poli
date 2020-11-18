import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  state = {search: ""};

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

  populateDropDown = () => {
    axios.get(
      `http://localhost:4000/politicians/`
      )
      .then(response => {
        console.log(response);
        this.setState({politicians: response})
    })
    .catch(err => {
      console.log(err);
    })
  }

  render () {
    return (
      <div>
        <div className="title card">
          <h1>Home</h1>
        </div>
        <div className="card">Hello and Welcome to POLI, your new home for politician and election news!</div> 
      </div>
    )
  }
}
export default Home;
export {
  Home
}