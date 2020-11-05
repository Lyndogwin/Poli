import React from 'react';

class DropDown extends React.Component {
  state = {
    listOpen: false,
    headerTitle: this.props.title
  }

  handleClickOutside = () => {
    this.setState({listOpen: false});
  }

  toggleList = () =>{
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }
  render() {
    const list = this.props.list;
    const {listOpen, headerTitle} = this.state;
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
              <li className="dd-list-item">
                <dl>
                  <dt><input type='checkbox' key={i}/></dt>
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