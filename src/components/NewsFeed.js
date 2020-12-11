import React from 'react';
import axios from 'axios';
import {Card, Feed } from 'semantic-ui-react';

class NewsFeed extends React.Component {
  state = {
    search: '',
    feed: []
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
    const search = this.props.keywords.politician.name;

    this.getInitFeed(search)
  }

  componentDidUpdate = () => {
    console.log("update occured");
    console.log(this.state.feed);
  }

  render() {
    console.log(this.props.keywords)

    console.log(this.state.feed)
    return(
      <div>
      {!this.props.keywords.focused && this.state.feed? '' : 
      <div className='customcard'>
        <Card fluid>  
          <Card.Content>
            <Card.Header>News Feed</Card.Header>
          </Card.Content>
        </Card>  

        <Card fluid>
        <Card.Content>
        <Feed size='large'>
          {this.state.feed.map((value,i)=> (
            <Feed.Event key={i}>
            <Feed.Label image={value.urlToImage}/>
            <Feed.Content>
              <Feed.Date content={value.publishedAt}/>
              <Feed.Summary>
                <a href={value.url} target='_blank'>{value.title}</a>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
          ))}
        </Feed>
        </Card.Content>
        </Card>
      </div>}
      </div>
    )
  }
}

export default NewsFeed;