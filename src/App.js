import React, { Component } from 'react'
import {HashRouter,Route} from 'react-router-dom'
import './index.css';
import Dashboard from './Dashboard';
import Docusign from './Docusign';
import Login from './Login';
import Signup from './Signup';
import Auth0Login from './Auth0Login';
import AuthService from './AuthService';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faBell);
library.add(faChevronDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faChevronUp);
library.add(faCompactDisc);
library.add(faEnvelope);
library.add(faPlus);
library.add(faSearch);
library.add(faUserCircle);

<script type="text/javascript" src="node_modules/auth0-js/build/auth0.js"></script>
  const auth = new AuthService();


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/login' component={Login} />
          <Route exact path='/auth0-login' render={() => <Auth0Login auth={auth} />} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/docusign' component={Docusign} />
        </div>
      </HashRouter>
    )
  }
}
export default App
