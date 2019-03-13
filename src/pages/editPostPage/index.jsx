import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import { updatePost } from '../../actions/postsActions';
import PostForm from '../../components/postForm';

class CreatePostPage extends Component {

  render() {
    const { categories, loading, currentPost, userUid, updatePost } = this.props;
    return (
      <div className="container">
        <h2>Edit post</h2>
        {loading
          ? <Loader />
          : currentPost &&
            <PostForm
              currentPost={currentPost}
              categories={categories}
              userUid={userUid}
              submitHandler={updatePost}
            />
        }
      </div>
    );
  };
};

const mapStateToProps = (state, props) => {
  const { categories } = state.categories;
  const { loading } = state.posts.newPost;
  const { user } = state.user;
  const postId = props.match.params.id;
  const currentPost = state.posts.posts && state.posts.posts.find(item => item.id === postId);
  return {
    userUid: user.uid,
    loading,
    categories,
    currentPost,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePost: (data, isNewCategory) => dispatch(updatePost(data, isNewCategory)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPage);

CreatePostPage.propTypes = {
  updatePost: PropTypes.func,
  loading: PropTypes.bool,
  categories: PropTypes.array,
  userUid: PropTypes.string,
};