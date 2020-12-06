import React from 'react';
import axios from 'axios';

class Feed extends React.Component {
  state = {
    feed: [
      {
       title: ""
      }
    ]
  }

  getInitFeed = (subject) => {
    axios.get(
      `http://localhost:4000/newsmedia/${subject}`
    )
    .then(response => {
      console.log(response.data.articles)
      this.setState({feed: response.data.articles});
    })
    .catch(err => {
      console.log(err)
    })
  
  }

  componentDidMount = () => {
    console.log("feed mounted");
    console.log(this.state.feed);
    const search = this.props.keywords.first +' '+ this.props.keywords.last;

    this.getInitFeed(search)
  }

  componentDidUpdate = () => {
    console.log("update occured");
    console.log(this.state.feed);
  }

  render() {
    console.log(this.props.keywords)

    return(
      <div>
        {this.state.feed[0].title}
      </div>
    )
  }
}

export default Feed;