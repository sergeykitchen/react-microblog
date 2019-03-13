import React from 'react';
import PropTypes from 'prop-types';
import { Route } from "react-router-dom";
import ProtectedeRoute from '../HOCs/protectedRoute';
import MainPage from '../pages/mainPage';
import SignUpPage from '../pages/signUpPage';
import SignInPage from '../pages/signInPage';
import PostPage from '../pages/postPage';
import CreatePostPage from '../pages/createPostPage';
import EditPostPage from '../pages/editPostPage';

function Routes(props) {
  return (
    <div>
      <Route exact path="/" component={MainPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/post/:id" component={PostPage} />
      <ProtectedeRoute user={props.user} path="/create-post" component={CreatePostPage} />
      <ProtectedeRoute user={props.user} path="/edit-post/:id" component={EditPostPage} />
    </div>
  );
};

export default Routes;

Routes.propTypes = {
  user: PropTypes.object,
};
