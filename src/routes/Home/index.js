import React from 'react';
import https from 'https';
import axios from 'axios';
import Politician from '../../components/Politician';

class Home extends React.Component {
  state = {search: ""};
  runSearch = (event) => {
    // API request logic here with this.state.search
    event.preventDefault();
    console.log(this.state.search);
    // const url = 'https://www.reddit.com/r/subreddit/search/?q=trump'

    const options = {
      method: 'get',
      url: '/reddit/search'

    }
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

  render () {
    return (
      <div>
        <div className="title card">
          <h1>Home</h1>
          <form onSubmit={this.runSearch}>
            <label>Search a Politician  </label>
            <input type="text" value={this.state.search} onChange={(e) => this.handleInput(e.target.value)}/>
          </form>
        </div>
        <div className="comparison">
          <Politician />
          <Politician />
        </div>
        <div className="card">Hello there</div> 
      </div>
    )
  }
}
export default Home;
export {
  Home
}