import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/userAction';
import SignUpForm from '../../components/signUpForm';

function SignUpPage(props) {
  const { loading, signUpUser } = props;
  return (
    <div classaName="form-container">
      <SignUpForm
        signUpUser={signUpUser}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { loading } = state.user;
  return {
    loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: data => dispatch(signUpUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

SignUpPage.propTypes = {
  signUpUser: PropTypes.func,
  loading: PropTypes.bool,
};