import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function singlePost({ user, data: { title, content, category, creator, imagePath, id } }) {

  return (
    <div className="container">
      <div className="jumbotron mt-3 post-item">
        <h3 className="post-title">
          {title}
        </h3>
        <div className="d-sm-flex justify-content-between align-items-center">
          <p className="category-label">
            {category.label}
          </p>
          {
            user && user.uid === creator &&
            <Link to={`/edit-post/${id}`} className="btn btn-outline-secondary">Edit post</Link>
          }
        </div>
        <img alt="Post figure" className="img-thumbnail img-post-thumnail mt-4" src={imagePath} />
        <p className="post-text mt-3">
          {content}
        </p>
      </div>
    </div>
  );
};

singlePost.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
}

export default singlePost;