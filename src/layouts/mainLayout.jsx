import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import { getPosts } from '../actions/postsActions';
import { getCategories } from '../actions/categoryActions';

class MainLayout extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  };
  
  render() {
    const { children } = this.props;
    return (
      <div className="main-layout">
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick />
        {children}
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategories()),
    getPosts: () => dispatch(getPosts()),
  }
}

export default connect(null, mapDispatchToProps)(MainLayout);