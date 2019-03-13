import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileInput extends Component {

  constructor(props) {
    super(props);
    this.input = null;
  };

  componentDidUpdate() {
    if(!this.props.imagePath) {
      this.input.value = '';
    }
  };

  fileInputChangeHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.props.setFileToState(file, reader.result);
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  setInputElement = el => {
    if (el) {
      this.input = el;
    };
  };

  render() {
    const { error, errorText, imagePath } = this.props;
    return (
      <div className="form-group mt-4">
        <label>Upload image for post</label>
        <input
          ref={this.setInputElement}
          type="file"
          className="form-control-file"
          onChange={this.fileInputChangeHandler}
        />
        {imagePath &&
          <div className="img-preload mt-2">
            <img alt="Post thumbnail" className="img-thumbnail" src={imagePath} />
          </div>
        }
        {error &&
          <div className="text-danger">{errorText}</div>
        }
      </div>
    );
  };
};

export default FileInput;

FileInput.propTypes = {
  error: PropTypes.bool,
  errorText: PropTypes.string,
  imagePath: PropTypes.string,
  setFileToState: PropTypes.func,
};