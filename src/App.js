import React, { Component } from 'react'
import {HashRouter,Route} from 'react-router-dom'
import './index.css';
import Dashboard from './Dashboard';
import Login from './Login';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Dashboard} />
        </div>
      </HashRouter>
    )
  }
}
export default App
