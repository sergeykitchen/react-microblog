import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilter } from '../../actions/postsActions';
import PostListItem from '../../components/postListItem';
import Loader from '../../components/loader';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  setFilter = (e) => {
    const id = e.target.hasAttribute('category-id')
      ? e.target.getAttribute('category-id')
      : null;
    this.props.setFilter(id);
  };

  setItems = () => {
    const { posts } = this.props;
    if (posts.length !== 0) {
      return (
        posts.map(item => {
          return (
            <PostListItem
              setFilter={this.setFilter}
              key={item.id}
              postId={item.id}
              title={item.title}
              category={item.category}
              imagePath={item.imagePath}
            />
          );
        })
      );
    }
    return (
      <div className="jumbotron mt=0 post-item">
        There are no posts yet.
      </div>
    );
  };

  render() {
    const { posts, loading, filter, user } = this.props;
    return (
      <div className="container">
        {
          user &&
          <Link to="/create-post" className="btn btn btn-secondary btn-lg btn-block mt-5">
            Create post
          </Link>
        }
        <div className="d-sm-flex justify-content-between align-items-center">
          <h2 className="mt-4 mb-4">Posts List</h2>
          {filter &&
            <button
              className="btn btn-outline-secondary"
              onClick={this.setFilter}
            >
              Reset filter
            </button>
          }
        </div>
        {
        loading
            ? <Loader />
            : posts && this.setItems()
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { posts, loading, filter } = state.posts;
  const { user } = state.user;
  return {
    loading,
    user,
    filter,
    posts: filter ? posts.filter(item => item.category.id === filter) : posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: id => dispatch(setFilter(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

MainPage.propTypes = {
  setFilter: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  filter: PropTypes.string,
  posts: PropTypes.array,
};