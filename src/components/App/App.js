import React from 'react';
import Popular from '../Popular/Popular';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Battle from '../Battle/Battle';
import Home from '../Home/Home';

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="container">
            <Nav />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/battle' exact component={Battle} />
              <Route path='/popular' exact component={Popular} />
              <Route render={() => (<p>Not Found Homie</p>)} />
            </Switch>
          </div>
        </Router>
      
    )
  }
}

export default App;