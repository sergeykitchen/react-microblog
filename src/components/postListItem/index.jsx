import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostItemList({ title, category, imagePath, postId, setFilter }) {
  return (
    <div className="jumbotron mt=0 post-item">
      <div className="d-sm-flex justify-content-between">
        <div>
          <Link to={`/post/${postId}`}>
            <h4 className="post-title">{title}</h4>
          </Link>
          <p
            category-id={category.id}
            className="category-label pointer"
            onClick={setFilter}
          >
            {category.label}
          </p>
        </div>
        <img alt="Thumbnail" className="img-thumbnail prev-post-thumnail" src={imagePath} />
      </div>
    </div>
  )
};

PostItemList.propTypes = {
  postId: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.string,
  }),
  imagePath: PropTypes.string,
  setFilter: PropTypes.func,
};

export default PostItemList;

