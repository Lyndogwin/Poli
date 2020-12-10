import React from 'react';
import NewsFeed from './NewsFeed';

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
            <div key={i} className={`card politician ${val[0].Party} ${this.state.feed &&(this.state.focused === i) ? this.state.focused_styling : this.state.feed ? 'not-focused':''}`} onClick={() => this.flipToFeed(i)}>
              {this.state.feed ? <NewsFeed keywords={{first: val[0].FirstName, last: val[0].LastName, focused: this.state.focused === i ? true: false}}/> : <div>
                <img className="profile" src={this.state.image} alt={val.FirstName}/>
                <h2>{val[0].FirstName} {val[0].LastName}</h2>
                <h3>Running Position: {val[0].Running_Position}</h3>
                <h4>Current Position: {val[0].Current_Position}</h4>
              </div>}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Comparison;