import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as authActions from "./store/actions/authActions";
import * as profileActions from "./store/actions/profileActions";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store/store";

import "./App.css";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/dashboard/CreateProfile";
import EditProfile from "./components/dashboard/edit-profile/EditProfile";
import AddExperience from "./components/dashboard/add-credentials/AddExperience";
import AddEducation from "./components/dashboard/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profiles/profile/Profile";
import NotFound from "./components/common/NotFound";

//Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(authActions.setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(authActions.logoutUser());

    // Clear current Profile
    store.dispatch(profileActions.clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />

                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />

                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />

                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />

                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
                <Route exact path="/not-found" component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
