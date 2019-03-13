import React from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/userAction';
import SignInForm from '../../components/signInForm';

function signInPage(props) {
  const { user, signInUser, loading } = props;
  return (
    <div className="form-container">
      <SignInForm
        loading={loading}
        user={user}
        signInUser={signInUser}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { loading, user } = state.user;
  return {
    loading,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signInUser: data => dispatch(signInUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signInPage);