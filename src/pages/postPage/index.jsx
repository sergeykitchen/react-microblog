import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import SinglePost from '../../components/singlePost';

class PostPage extends Component {

  render() {
    const { loading, currentPost, user } = this.props;
    return (
      <div>
        {
          loading
            ? <Loader />
            : currentPost && <SinglePost data={currentPost} user={user} />
        }
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
  const { posts } = state;
  const { user } = state.user;
  const currentPostId = props.match.params.id;
  return {
    loading: posts.loading,
    currentPost: posts.posts !== null && posts.posts.find(item => item.id === currentPostId),
    user,
  };
};

export default connect(mapStateToProps)(PostPage);

PostPage.propTypes = {
  loading: PropTypes.bool,
  currentPost: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  user: PropTypes.object,
}
