import React from 'react';
import NewsFeed from './NewsFeed';
import {Button} from 'semantic-ui-react';

class Comparison extends React.Component {
  state = {
    politicians: [],
    image: "https://pbs.twimg.com/profile_images/841429728657580036/_KAJv8es_400x400.jpg",
    feed: false,
    focused: null,
    focused_styling: "focused"
  }

  update = () => {
    this.setState({
      politicians: this.props.politicians
    })
  }

  flipToFeed = (index) => {
    this.setState({feed: !this.state.feed})
    this.setState({focused: index})
  }

  render () {
    console.log("data transfered: ")
    console.log(this.props.politicians);
    const politicians = this.props.politicians;

    return(
      <div>
        <div className={`comparison`}>
          {politicians.length !== 0 && politicians.map((val,i) => (
            <div key={i} className={`customcard politician ${val.party} ${this.state.feed &&(this.state.focused === i) ? this.state.focused_styling : this.state.feed ? 'not-focused':''}`}>
              {!this.state.feed ? <Button onClick={() => this.flipToFeed(i)}>Expand Feed</Button>:this.state.focused === i ? <Button onClick={() => this.flipToFeed(i)}>Collapse Feed</Button>:<div/> }
              {this.state.feed ? <NewsFeed keywords={{politician: val, focused: this.state.focused === i ? true: false}}/> : <div>
                <img className="profile" src={val.photoUrl ||  `../images/${val.party}.svg`} alt={val.name}/>
                <h2>{val.name}</h2>
                <h3>{val.party}</h3>
                <h3>Offical Website: {val.url}</h3>
              </div>}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Comparison;