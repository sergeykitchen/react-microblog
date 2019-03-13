import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import { createPost } from '../../actions/postsActions';
import PostForm from '../../components/postForm';

class CreatePostPage extends Component {

  render() {
    const { loading, categories, userUid, createPost } = this.props;
    return (
      <div className="container">
        <h2>Create post</h2>
        {
          loading
            ? <Loader />
            : <PostForm
              categories={categories}
              userUid={userUid}
              submitHandler={createPost}
            />
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { categories } = state.categories;
  const { loading } = state.posts.newPost;
  const { user } = state.user;
  return {
    categories,
    loading,
    userUid: user.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: (data, isNewCategory) => dispatch(createPost(data, isNewCategory)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPage);

CreatePostPage.propTypes = {
  createPost: PropTypes.func,
  categories: PropTypes.array,
  loading: PropTypes.bool,
  userUid: PropTypes.string,
};