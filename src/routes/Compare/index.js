import React from 'react';
import axios from 'axios';
import DropDown from '../../components/DropDown';
import Comparison from '../../components/Comparison';

import {Dropdown} from 'semantic-ui-react';

class Compare extends React.Component {
  constructor(props){
    super(props);
    this.dropRef = React.createRef();
  }
  state = {
    search: "",
    politicians: [],
    positions: [],
    filtered: [],
    states: [],
    compare: [],
    Running_Position: '*',
    state: '*',
    distict: '*',
    feed: false
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
    // axios.get(
    //   `http://localhost:4000/politicians/init`
    // )
    // .then(response => {
    //   this.setState({politicians: response.data})
    // })
    // .catch(err => {
    //   console.log(err);
    // })

    // axios.get(
    //   `http://localhost:4000/positions/`
    // )
    // .then(response => {
    //   this.setState({positions: response.data})
    // })
    // .catch(err => {
    //   console.log(err);
    // })
  }

  filter = (e,data) => {
    var name = data.name;
    var val = data.value;

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

  filter2 = (e,data) => {
    var name = data.name;
    var val = data.value;
    console.log("position filter indices:");
    console.log(val);
    var test = 0;
    console.log(val.includes(test));
    
    this.setState({
        filtered: this.state.politicians.filter((v,i) => { return val.includes(i)})
    })
  }  
  search = (query) => {
    axios.get(
      `http://localhost:4000/civicapi/${query}`
    )
    .then(response => {
      console.log(response.data);
      this.setState(
        {
          search: response.data,
          politicians: response.data.officials,
          filtered: response.data.officials,
          positions: response.data.offices
        });
    })
    .catch(err => {
      console.log(err);
    })
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

  populateCompare2 = (val)=> {
    this.setState({compare: []})

    this.setState({compare: val});
  }

  feedstate = (swap = false, def= false) => {
    if (swap){
      this.setState(
        {
          feed: !this.state.feed
        }
      )
    }
    if (def){
      this.setState(
        {
          feed: false
        }
      )
    }
    return this.state.feed
  }


  render () {
    const postiion_options = this.state.positions.map((item, i)=>(
      {
        key:i,
        text: item.name,
        value: item.officialIndices
      }
    ))
    return (
      <div>
        <div className="title customcard">
          <h1>Compare</h1>
          {/* <form onSubmit={this.runSearch}>
            <label>Test basic call to reddit via proxy http request</label>
            <input type="text" value={this.state.search} onChange={(e) => this.handleInput(e.target.value)}/>
          </form> */}

          <div className="ui search customcard">
            <div className="ui icon input">
              <input className="prompt" type="text" placeholder="Zip Code..." onChange={(e) => this.search(e.target.value)}/>
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>

          <div className="customcard"> 
            <Dropdown placeholder='Select Position' 
              fluid 
              selection 
              name='Running_Position'
              options={postiion_options}
              onChange={this.filter2}
              />
          </div>

          <DropDown ref={this.dropRef} compare={this.populateCompare2} title="Select Politician" list={this.state.filtered} checkbox={this.checkboxLimit} changeFeedState={this.feedstate}/>
        </div>

        
        <Comparison politicians={this.state.compare} feedmaster={this.state.feed}/>
  
        {/* <div className="comparison">
          {(this.state.compare.length !== 0) && this.comparison()}
        </div> */}

      </div>
    )
  }
}
export default Compare;
export {
  Compare
}
