import React from 'react';

class DropDown extends React.Component {
  state = {
    listOpen: false,
    headerTitle: this.props.title,
    checkCount: 0,
    checked: []
  }

  handleClickOutside = () => {
    this.setState({listOpen: false});
  }

  toggleList = () =>{
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  updateCount = (check,key) => {
    console.log(check);
    if (check){
      this.setState({checkCount: this.state.checkCount + 1});
      this.setState({checked: [...this.state.checked, key]});
    }
    else { 
      this.setState({checkCount: this.state.checkCount - 1});
      this.setState({checked: this.state.checked.filter((v,i,arr)=>{ return v !== key})})
    }
     console.log(this.state.checked);
  }
  render() {
    const list = this.props.list;
    const listOpen = this.state.listOpen;
    const headerTitle = this.state.headerTitle;
    const checkCount = this.state.checkCount;
    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={()=> this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? "^"
            : " "
          }
        </div>
        {listOpen && 
          <ul className="dd-list">
            {list.map((item,i)=> (
              <li className="dd-list-item" key={i}>
                <dl>
                  <dt><input type='checkbox' key={i} onChange={(e)=> this.updateCount(e.target.checked,i)} disabled={this.props.checkbox(checkCount) && !this.state.checked.includes(i)}/></dt>
                  <dd key={i}>{item.FirstName} {item.LastName}</dd>
                </dl>
              </li>
            ))}
          </ul>
        }

      </div>
    )
  }
}

export default DropDown;