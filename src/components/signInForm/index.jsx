import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateEmail, validatePass } from '../../utils';
import Loader from '../loader';
import Inputlabel from '../inputLabel';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
    };
  };

  checkErrors() {
    const { email, password } = this.state.errors;
    return !(email || password);
  };

  validateField() {
    let result = false;
    const errors = {
      email: '',
      password: '',
    };
    const { email, password } = this.state;
    if (validateEmail(email).isError) {
      errors.email = validateEmail(email).errorText;
      result = true;
    }
    if (validatePass(password).isError) {
      errors.password = validatePass(password).errorText;
      result = true;
    }
    this.setState({
      errors: errors,
    })
    return result;
  };

  onChangeHandler = e => {
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateField()) {
      this.props.signInUser({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };

  render() {
    return (
      <div>
        {
          this.props.loading
            ? <Loader />
            : <div className="container col-sm-8 col-md-6 col-xl-4 mt-5">
              <form onSubmit={this.handleSubmit}>
                <Inputlabel
                  name='email'
                  value={this.state.email}
                  label='Email'
                  type='text'
                  placeholder='email'
                  wrapperClass='mt-4'
                  onChange={this.onChangeHandler}
                  error={!!this.state.errors.email}
                  errorText={this.state.errors.email}
                />
                <Inputlabel
                  value={this.state.password}
                  name='password'
                  type='password'
                  label='Password'
                  placeholder='Password'
                  wrapperClass='mt-4'
                  onChange={this.onChangeHandler}
                  error={!!this.state.errors.password}
                  errorText={this.state.errors.password}
                />
                <button className='btn btn-primary mt-5' disabled={false} variant="primary" type="submit">
                  Sign In
                </button>
              </form>
            </div>
        }
      </div>
    );
  }
};

export default SignInForm;

SignInForm.propTypes = {
  signInUser: PropTypes.func,
  loading: PropTypes.bool,
};