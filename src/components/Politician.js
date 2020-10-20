import React from 'react';

class Politician extends React.Component {
  state = {
    name: "Political Man",
    image: "https://pbs.twimg.com/profile_images/841429728657580036/_KAJv8es_400x400.jpg",
  }

  render () {
    return(
      <div className="card politcian">
        <img className="profile" src={this.state.image} alt={this.state.name}/>
        <h3>Politician Man</h3>
      </div>
    )
  }
}

export default Politician;