import React, { useEffect } from 'react';
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
import Alerts from './components/alert/Alerts';
import Posts from './components/posts/Posts';
import NewPostForm from './components/forms/NewPostForm';
import Post from './components/post/Post';
import { setAuthToken } from './utils/axiosConfig';
import { getUser } from './actions';

const store = configureStore();

// Set auth token for axios
setAuthToken(localStorage.token);

function App() {
  useEffect(() => {
    // Immeidately authenticate the user if an authorized token exists
    store.dispatch<any>(getUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alerts />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/myprofile" component={Profile} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/post/:id" component={Post} />

          {/* TODO: Make it into a private route */}
          <Route exact path="/newpost" component={NewPostForm} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
