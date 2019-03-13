import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inputlabel from '../inputLabel';
import Loader from '../loader';
import * as validateHelper from '../../utils';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.isError = false;
    this.state = {
      userName: '',
      email: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      errors: {
        userName: '',
        email: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
      },
    };
  };

  checkErrors = () => {
    const { email, password, userName, birthDate, confirmPassword } = this.state.errors;
    return !(email || password || userName || birthDate || confirmPassword);
  };

  validateField = () => {
    let result = false;
    const errors = {
      userName: '',
      email: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
    };
    const { userName, email, birthDate, password, confirmPassword } = this.state;
    if (validateHelper.validateEmail(email).isError) {
      errors.email = validateHelper.validateEmail(email).errorText;
      result = true;
    }
    if (validateHelper.validateRequreField(userName)) {
      errors.userName = 'User name is required.';
      result = true;
    }
    if (validateHelper.validateRequreField(birthDate)) {
      errors.birthDate = 'Date is required.';
      result = true;
    }
    if (validateHelper.validatePass(password).isError) {
      errors.password = validateHelper.validatePass(password).errorText;
      result = true;
    }
    if (validateHelper.validateConfirmPass(confirmPassword, password)) {
      errors.confirmPassword = 'Password is not matched.';
      result = true;
    }
    this.setState({
      errors: errors,
    });
    return result;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateField()) {
      this.props.signUpUser({
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
        birthDate: this.state.birthDate,
      });
    }
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

  render() {
    const { email, errors, userName, birthDate, password, confirmPassword } = this.state;
    return (
      <div>
        {
          this.props.loading
            ? <Loader />
            : <div className="container col-sm-8 col-md-6 col-xl-4 mt-5">
              <form onSubmit={this.handleSubmit} noValidate>
                <Inputlabel
                  name='email'
                  value={email}
                  label='Email'
                  type='text'
                  placeholder='email'
                  wrapperClass='mt-2'
                  onChange={this.onChangeHandler}
                  error={!!errors.email}
                  errorText={this.state.errors.email}
                />
                <Inputlabel
                  name='userName'
                  value={userName}
                  label='User name'
                  type='text'
                  placeholder='User name'
                  wrapperClass='mt-2'
                  onChange={this.onChangeHandler}
                  error={!!errors.userName}
                  errorText={errors.userName}
                />
                <Inputlabel
                  name='birthDate'
                  value={birthDate}
                  label='Date of Birth'
                  type='date'
                  placeholder='email'
                  wrapperClass='mt-2'
                  onChange={this.onChangeHandler}
                  error={!!errors.birthDate}
                  errorText={errors.birthDate}
                />
                <Inputlabel
                  value={password}
                  name='password'
                  type='password'
                  label='Password'
                  placeholder='Password'
                  wrapperClass='mt-2'
                  onChange={this.onChangeHandler}
                  error={!!errors.password}
                  errorText={errors.password}
                />
                <Inputlabel
                  value={confirmPassword}
                  name='confirmPassword'
                  type='password'
                  label='Confirm password'
                  placeholder='Password'
                  wrapperClass='mt-2'
                  onChange={this.onChangeHandler}
                  error={!!errors.confirmPassword}
                  errorText={errors.confirmPassword}
                />
                <button className='btn btn-primary mt-5' disabled={false} variant="primary" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
        }
      </div>
    );
  };
};



export default SignUpForm;

SignUpForm.propTypes = {
  loading: PropTypes.bool,
  signUpUser: PropTypes.func,
};