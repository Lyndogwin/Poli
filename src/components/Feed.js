import React from 'react';
import axios from 'axios';

class Feed extends React.Component {
  state = {
    feed: {}
  }

  getInitFeed = (subject) => {
    axios.get(
      `http://localhost:4000/newsmedia/${subject}`
    )
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }


  render() {
    return(
      <div>
        Test
      </div>
    )
  }
}

export default Feed;