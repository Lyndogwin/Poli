import React from 'react';
import axios from 'axios';
import DropDown from '../../components/DropDown';
import Comparison from '../../components/Comparison';


class Test extends React.Component {
  constructor(props){
    super(props);
    this.dropRef = React.createRef();
  }
  state = {
    search: "",
    politicians: [],
    positions: [],
    states: [],
    compare: [],
    Running_Position: '*',
    state: '*',
    distict: '*'
  };

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

  componentDidMount = () => {
    axios.get(
      `http://localhost:4000/politicians/init`
    )
    .then(response => {
      this.setState({politicians: response.data})
    })
    .catch(err => {
      console.log(err);
    })

    axios.get(
      `http://localhost:4000/positions/`
    )
    .then(response => {
      this.setState({positions: response.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  filter = (e1) => {
    var name = e1.target.name;
    var val = e1.target.value;

    this.setState({...this.state,
      [name]: val
    })

    var query = `WHERE ${name} = "${val}"`

    axios.get(
      `http://localhost:4000/politicians/${query}`
    )
    .then(response => {
      this.setState({politicians: response.data});
    })
    .catch(err => {
      console.log(err);
    })

    // resest check counts
    this.dropRef.current.clearCount();
  }

  checkboxLimit = (count) => {
    var disable = false
    if (count >1) {
      disable = true;
    } 
    return disable
  }

  populateCompare = (val) => {
    // clear comparison state
    this.setState({compare: []})


    var query = '';

    val.map((v,i) => {
      query = `WHERE FirstName="${v.first}" AND LastName="${v.last}";` 
      
      axios.get(
        `http://localhost:4000/politicians/${query}`
      )
      .then(response => {
        this.setState({compare: [...this.state.compare,response.data]},() => {console.log("comparison population: "); console.log(this.state.compare)});
      })
      .catch(err => {
        console.log(err);
      })
    }) 
  }


  render () {
    return (
      <div>
        <div className="title card">
          <h1>Test</h1>
          <form onSubmit={this.runSearch}>
            <label>Test basic call to reddit via proxy http request</label>
            <input type="text" value={this.state.search} onChange={(e) => this.handleInput(e.target.value)}/>
          </form>

          <form onSubmit={this.filter}>
            <label>Politician Filter</label>
            <select name='Running_Position' onChange={this.filter}>
              {this.state.positions.map((item,i)=>(
                <option key={i} value={item.Running_Position}>{item.Running_Position}</option>
                ))}
            </select>
            <select name='state'>
              {/* add options for state after database includes state */}
            </select>

          </form>
          <DropDown ref={this.dropRef} compare={this.populateCompare} title="Select Politician" list={this.state.politicians} checkbox={this.checkboxLimit}/>
        </div>

        
        <Comparison politicians={this.state.compare}/>
  
        {/* <div className="comparison">
          {(this.state.compare.length !== 0) && this.comparison()}
        </div> */}

        <div className="card">Hello there</div> 
      </div>
    )
  }
}
export default Test;
export {
  Test
}