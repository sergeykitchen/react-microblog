import React from 'react';
import { Router } from "react-router-dom";
import { connect } from 'react-redux';
import MainLayout from './layouts/mainLayout';
import { signOut } from './actions/userAction'
import Header from './components/header';
import Routes from './routes';
import history from './history';

const App = (props) => (
  <MainLayout>
    <Router history={history}>
      <div>
        <Header user={props.user} signOut={props.signOut} />
        <Routes user={props.user} />
      </div>
    </Router>
  </MainLayout>
);

const mapStateToProps = ({ user }) => {
  return {
    user: user.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
