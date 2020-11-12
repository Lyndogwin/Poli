import React from 'react';

class Comparison extends React.Component {
  state = {
    politicians: [],
    image: "https://pbs.twimg.com/profile_images/841429728657580036/_KAJv8es_400x400.jpg",
  }

  update = () => {
    this.setState({
      politicians: this.props.politicians
    })
  }

  // componentDidMount = () => {
  //   this.setState({
  //     politicians: this.props.politicians
  //   })
  // }

  render () {
    console.log("data transfered: ")
    console.log(this.props.politicians);
    const politicians = this.props.politicians;
    return(
      <div className='comparison'>
        {politicians.length !== 0 && politicians.map((val,i) => (
          <div key={i} className={`card politician ${val[0].Party}`}>
            <img className="profile" src={this.state.image} alt={val.FirstName}/>
            <h2>{val[0].FirstName} {val[0].LastName}</h2>
            <h3>Running Position: {val[0].Running_Position}</h3>
          </div>
        ))}
      </div>
    )
  }
}

export default Comparison;