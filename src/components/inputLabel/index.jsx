import React from 'react';

function InputLabel(props) {
    const { value, name, onChange, labelClass, wrapperClass,label, type, placeholder, error, errorText, autocomplete} = props;
    return (
      <div className={wrapperClass + (!!error ? ' error' : '')}>
        {
          label &&
          <label className={labelClass}>{label}</label>
        }
        <div>
          <input
            autoComplete={autocomplete}
            name={name}
            className="form-control"
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
          />
          {error &&
          <div className="text-danger">{errorText}</div>
          }
        </div>
      </div>
    )
};

InputLabel.defaultProps = {
  autocomplete: 'on',
  value: '',
  label: '',
  type:'text',
  placeholder: '',
  error: null,
  errorText: '',
  wrapperClass: '',
  labelClass: '',
  onChange: () => {
  }
};

export default InputLabel;