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
        <div className="title customcard">
          <h1>POLI</h1>
        </div>
        <div className="customcard politician Republican">  
          <h1>Hello and Welcome to POLI <i className="us flag large"></i>, 
            your new home for politician and election news!
          </h1>
        </div> 
        <div className="customcard politician White">
          <h3>
            Using POLI, you will have access to considerable amounts of information about your favorite politicians and upcoming political races.
            
            POLI utilizes both the <a href='https://developers.google.com/civic-information' target='_blank'>Google Civic API </a>
            and the <a href='https://newsapi.org/'>News API</a> to bring general information and news on politicians directly to you
            with just the entry of your zipcode and a few clicks. 
          </h3> 
         </div>
        <div className="customcard politician Democratic"><h3>From here, you can navigate to the compare page to enter your zip code and get started!</h3></div>
      </div>
    )
  }
}
export default Home;
export {
  Home
}