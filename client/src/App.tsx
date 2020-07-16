import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import './App.scss';
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import Navbar from './components/layout/Navbar';
import Profile from './components/profile/Profile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/myprofile" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
