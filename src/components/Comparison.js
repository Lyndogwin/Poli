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

  componentDidMount = () => {
    this.setState({
      politicians: this.props.politicians
    })
  }

  render () {
    console.log("data transfered: ")
    console.log(this.props.politicians);
    const politicians = this.props.politicians;
    return(
      <div className='comparison'>
        {politicians.length !== 0 && politicians.map((val,i) => (
          <div key={i} className="card politcian">
            <img className="profile" src={this.state.image} alt={val.FirstName}/>
            <h3>{val[0].FirstName} {val[0].LastName}</h3>
          </div>
        ))}
      </div>
    )
  }
}

export default Comparison;