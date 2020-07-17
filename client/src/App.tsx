import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// REDUX
import { configureStore } from './store';
import { Provider } from 'react-redux';
import './App.scss';

// COMPONENTS
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import Navbar from './components/layout/Navbar';
import Profile from './components/profile/Profile';

const store = configureStore();

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
