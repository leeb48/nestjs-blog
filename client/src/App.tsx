import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// REDUX
import { configureStore } from "./store";
import { Provider } from "react-redux";
import "./App.scss";

// COMPONENTS
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Navbar from "./components/layout/Navbar";
import Profile from "./components/profile/Profile";
import Alerts from "./components/alert/Alerts";
import Posts from "./components/posts/Posts";
import NewPostForm from "./components/forms/NewPostForm";
import Post from "./components/post/Post";
import { getUser } from "./actions";
import EditPostForm from "./components/forms/EditPostForm";
import PrivateRoute from "./components/routes/PrivateRoute";
import Landing from "./components/layout/Landing";
import EditCommentForm from "./components/post/EditCommentForm";
import EditBioForm from "./components/forms/EditBioForm";

const store = configureStore();

function App() {
  useEffect(() => {
    // Immeidately authenticate the user if an authorized token exists
    if (localStorage.token) {
      store.dispatch<any>(getUser(false));
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alerts />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/post/:id" component={Post} />

          <PrivateRoute exact path="/myprofile" compoment={Profile} />
          <PrivateRoute exact path="/newpost" compoment={NewPostForm} />
          <PrivateRoute
            exact
            path="/editpost/:postId"
            compoment={EditPostForm}
          />
          <PrivateRoute
            exact
            path="/edit-comment"
            compoment={EditCommentForm}
          />

          <PrivateRoute exact path="/edit-bio" compoment={EditBioForm} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
