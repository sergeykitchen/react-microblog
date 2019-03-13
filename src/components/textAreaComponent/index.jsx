import React from 'react';
import PropTypes from 'prop-types';

function TextAreaComponent(props) {
  const { label, value, name, onChangeHandler, error, errorText } = props;
  return (
    <div className="form-group mt-4">
      {
        label &&
        <label>{label}</label>
      }
      <textarea
        rows={15}
        value={value}
        name={name}
        className={"form-control" + (!!error ? ' error' : '')}
        onChange={onChangeHandler}
      />
      {error &&
        <div className="text-danger">{errorText}</div>
      }
    </div>
  );
}

export default TextAreaComponent;

TextAreaComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChangeHandler: PropTypes.func,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};
