import React from 'react';

class DropDown extends React.Component {
  state = {
    listOpen: true,
    headerTitle: this.props.title,
    checkCount: 0,
    checkedKeys: [],
    checkedValues: []
  }

  handleClickOutside = () => {
    this.setState({listOpen: false});
  }

  toggleList = () =>{
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  updateCount = (check,val,key) => {
    console.log("checked: " + check);
    console.log("item:");
    console.log(val.name);
    if (check){
      this.setState({
        checkCount: this.state.checkCount + 1,
        checkedKeys: [...this.state.checkedKeys, key],
        checkedValues: [...this.state.checkedValues,val]

      });
    }
    else { 
      this.setState({
        checkCount: this.state.checkCount - 1,
        checkedKeys: this.state.checkedKeys.filter(v => { return v !== key}),
        checkedValues: this.state.checkedValues.filter(v => { return ((v.name !== val.name))})
      })
    }
  }

  clearCount = () => {
    this.setState({
      checkCount: 0,
      checkedKeys: [],
      checkedValues: []
    })
    console.log("count cleared");
  }

  submitFunction = (e) => {
    e.preventDefault();
    console.log(this.state.checkedValues);
    this.props.compare(this.state.checkedValues);
    this.clearCount();
    // redirect to new route with parameters this.state.values
  }

  // I made a change for a git commit
  render() {
    const list = this.props.list;
    const listOpen = this.state.listOpen;
    const headerTitle = this.state.headerTitle;
    const checkCount = this.state.checkCount;
    // const clearCount = this.props.clearCount;

    return (
      <div className="dd-wrapper">
        
        <div className="dd-header" onClick={()=> this.toggleList()}>
          <div className="dd-header-title"><h3>{headerTitle}</h3></div>
          {listOpen
            ? "^"
            : " "
          }
        </div>
        <form onSubmit={this.submitFunction}> 
          {listOpen && 
            <ul className="dd-list">
              {list.map((item,i)=> (
                <li className="dd-list-item" key={i}>
                  <dl>
                    <dt>
                      <input type='checkbox' onChange={(e)=> this.updateCount(e.target.checked,item,i)}
                      /* control component by 'checkedKeys' attribute */
                      checked={this.state.checkedKeys.includes(i)}
                      disabled={this.props.checkbox(checkCount) && !this.state.checkedKeys.includes(i)}/>
                    </dt>
                    <dd><h3>{item.name}</h3></dd>
                  </dl>
                </li>
              ))}
            </ul>
          }
          <input type='submit' value='Compare !'/>
        </form>

      </div>
    )
  }
}

export default DropDown;