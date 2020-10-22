import React, { Fragment, useEffect } from "react";
import Alert from "./component/Alert";
import Webinar from "./component/Webinar";
import Header from "./component/Header";
import Login from "./component/Login";
import SinglePost from "./component/SinglePost";
import RegisteredPosts from "./component/registeredPosts/RegisteredPosts";
import store from "./store";
import { loadUser, setAuthToken } from "./actions/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Fragment>
        <Header />

        <Alert />

        <Route exact path="/" component={Webinar} />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/webinar/:id" component={SinglePost} />
          <Route exact path="/registered" component={RegisteredPosts} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
