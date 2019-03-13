import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import { validateRequreField, validateFileInput } from '../../utils';
import InputLabel from '../inputLabel';
import AutoSuggest from '../autoSuggest';
import TextAreaComponent from '../textAreaComponent';
import FileInput from '../fileInput';

class PostForm extends Component {

  constructor(props) {
    super(props);
    const emptyPost = {
      title: '',
      content: '',
      imagePath: '',
      category: '',
      postKey: '',
    }
    const defaultState = this.props.currentPost ? this.props.currentPost : emptyPost;
    this.state = {
      ...defaultState,
      isNewCategory: false,
      errors: {
        imagePath: '',
        title: '',
        category: '',
        content: '',
        file: '',
      },
    };
  };

  componentWillUnmount = () => {
    this.resetForm();
  };

  onChangeHandler = (e) => {
    if (this.checkErrors()) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      }, this.validateField);
    }
  };

  checkErrors = () => {
    const { title, category, content, file } = this.state.errors;
    return !(title || category || content || file);
  }

  setFileToState = (file, imagePath) => {
    if (this.checkErrors()) {
      this.setState({
        file: file,
        imagePath: imagePath,
      });
    } else {
      this.setState({
        file: file,
        imagePath: imagePath,
      }, this.validateField);
    }
  };

  handleSetNewName = (category) => {
    if (category.id === null) {
      this.setState({
        isNewCategory: true,
        category: {
          label: category.label,
          id: uid(),
        },
      });
    } else {
      this.setState({
        isNewCategory: false,
        category: category,
      });
    }
    if (!this.checkErrors()) {
      this.validateField();
    }
  };

  resetForm = () => {
    this.setState({
      imagePath: '',
      title: '',
      content: '',
      file: '',
      category: {
        label: '',
        id: null,
      },
      isNewCategory: false,
      errors: {
        title: '',
        category: '',
        content: '',
        file: '',
      },
    });
  };

  validateField = () => {
    let result = false;
    const errors = {
      title: '',
      category: '',
      content: '',
      file: '',
    };
    const { title, category, content, file } = this.state;
    if (validateRequreField(title)) {
      errors.title = 'Title is required.'
      result = true;
    }
    if (validateRequreField(content)) {
      errors.content = 'Content is required.'
      result = true;
    }
    if (validateRequreField(category.label)) {
      errors.category = 'Category is required.'
      result = true;
    }
    if (!this.props.currentPost) {
      if (validateFileInput(file).isError) {
        errors.file = validateFileInput(file).errorText;
        result = true;
      }
    }
    this.setState({
      errors,
    });
    return result;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateField()) return;
    const { title, content, imagePath, file, category, isNewCategory, postKey } = this.state;
    const { userUid, currentPost } = this.props;
    const postParams = {
      id: currentPost ? currentPost.id : uid(),
      file: file,
      title: title,
      content: content,
      imagePath: imagePath,
      category: category,
      creator: userUid,
      postKey: postKey,
    };
    this.props.submitHandler(postParams, isNewCategory);
  };

  render() {
    const { title, content, errors, category, imagePath } = this.state;
    const { categories, currentPost } = this.props;
    return (
      <div>
        <form className="pb-4" onSubmit={this.handleSubmit}>
          <InputLabel
            autocomplete="off"
            wrapperClass='mt-4'
            value={title}
            label="Title of post"
            name="title"
            onChange={this.onChangeHandler}
            error={!!errors.title}
            errorText={errors.title}
          />
          <AutoSuggest
            label="Category"
            inputClassName="form-control"
            placeholder="select category"
            value={category ? category.label : ''}
            onOptionSelect={e => this.handleSetNewName(e)}
            onChange={this.handleSetNewName}
            options={categories}
            error={!!errors.category}
            errorText={errors.category}
          />
          <TextAreaComponent
            name="content"
            label="Content of post"
            value={content}
            onChangeHandler={this.onChangeHandler}
            error={!!errors.content}
            errorText={errors.content}
          />
          {
            currentPost
              ?
              <div className="img-preload mt-2">
                <img alt="Post thumbnail" className="img-thumbnail" src={currentPost.imagePath} />
              </div>
              :
              <FileInput
                setFileToState={this.setFileToState}
                error={!!errors.imagePath || !!errors.file}
                errorText={errors.imagePath || errors.file}
                imagePath={imagePath}
              />
          }
          <button type="submit" className="btn btn-primary mt-5">
            Save
            </button>
          <button type="button" onClick={this.resetForm} className="btn btn-outline-primary mt-5 ml-4">
            Reset form
            </button>
        </form>
      </div>
    );
  };
};

export default PostForm;

PostForm.propTypes = {
  userUid: PropTypes.string,
  currentPost: PropTypes.object,
  submitHandler: PropTypes.func,
}
