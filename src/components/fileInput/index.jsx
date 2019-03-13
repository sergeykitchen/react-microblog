import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: null,
    };
  };

  componentDidMount() {
    if (this.props.imagePath) {
      this.setState({
        imagePreviewUrl: this.props.imagePath,
      });
    }
  };

  fileInputChangeHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.props.setFileToState(file, reader.result);
      this.setState({
        imagePreviewUrl: reader.result,
      });
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { error, errorText } = this.props;
    return (
      <div className="form-group mt-4">
        <label>Upload image for post</label>
        <input
          type="file"
          className="form-control-file"
          onChange={this.fileInputChangeHandler}
        />
        {this.state.imagePreviewUrl &&
          <div className="img-preload mt-2">
            <img alt="Post thumbnail" className="img-thumbnail" src={this.state.imagePreviewUrl} />
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