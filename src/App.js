import React from 'react';
import * as Routes from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css'
import './App.css';


class App extends React.Component{ 
  render(){ 
    return (
      <div className="parallax-container">
        <div className="americanflag background"></div>
        <div className="foreground">
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <NavLink exact to="/">Home</NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/about">About</NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/compare">Compare</NavLink>
                  </li>
                  {/* <li className="right-float">
                    <NavLink to="/login">Login</NavLink>
                  </li> */}
                </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/login">
                  <Users />
                </Route>
                <Route path="/compare">
                  <Routes.Compare />
                </Route>
                <Route path="/">
                  <Routes.Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Login</h2>;
}

export default App;