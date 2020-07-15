import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import './App.scss';
import Register from './components/forms/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
