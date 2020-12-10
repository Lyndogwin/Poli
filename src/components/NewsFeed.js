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
    const search = this.props.keywords.first +' '+ this.props.keywords.last;

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
      <div className="feed">
        {!this.props.keywords.focused && this.state.feed? '' : 
        <Card>  
          <Card.Content>
            <Card.Header>News Feed</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              {this.state.feed.map((value,i)=> (
              <Feed.Event key={i}>
                <Feed.Label image={value.urlToImage}/>
                <Feed.Content>
                  <Feed.Date content={value.publishedAt}/>
                  <Feed.Summary>
                    <a src={value.url}>{value.title}</a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              ))}
            </Feed>
          </Card.Content>
        </Card>}
      </div>
    )
  }
}

export default NewsFeed;