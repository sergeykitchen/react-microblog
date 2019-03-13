import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import './style.scss';

class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editing: false,
      allSuggestion: false,
      options: [],
    };
    this.Input = null;
  };

  componentDidMount() {
    this.setFullOptions();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  };

  setFullOptions() {
    this.setState({ options: this.props.options });
  };

  setInputElement(el) {
    this.Input = el;
  };

  saveInputValue() {
    this.toggleEditing(false);
    this.Input.blur();
    if (
      this.props.value !== this.state.value
    ) {
      const category = this.state.options.find(item => item.label === this.state.value);
      if (category) {
        this.props.onChange({id: category.id, label: category.label});
      } else {
        this.props.onChange({id: null, label: this.state.value});
      }
    } else {
      this.setState({ value: this.props.value });
    }
  };

  handleClickOutside() {
    this.saveInputValue();
  };

  fiterOptions(str) {
    const options = this.props.options.filter(i => ~i.label.indexOf(str));
    this.setState({ options });
  }

  toggleEditing = (value) => {
    this.setState({ editing: value });
    if (!value) {
      this.setState({ allSuggestion: false });
    }
  };

  handleKeyDown = (e) => {
    if (~[9, 13].indexOf(e.keyCode)) {
      this.saveInputValue();
    }
    if (e.keyCode === 27) {
      this.Input.blur();
      this.toggleEditing(false);
      this.setState({ value: this.props.value });
    }
  };

  handleChange = (e) => {
    const val = e.target.value.trim();
    this.setState({ value: val, allSuggestion: false });
    this.fiterOptions(val);
  };

  handleSetOptionValue = (obj) => {
    this.toggleEditing(false);
    this.props.onOptionSelect(obj);
  };

  handleGetAllSuggestions = (e) => {
    if (!this.state.allSuggestion) {
      this.setState({ allSuggestion: true, editing: true });
      this.setFullOptions();
    } else {
      this.setState({ allSuggestion: false });
    }
  };

  render() {
    const {
      inputClassName,
      options,
      placeholder,
      label,
      error,
      errorText,
      value
  } = this.props;

    return (
      <div className={"selectInput-Wrapper mt-4" + (error ? ' error' : '')}>
        {label &&
          <label>{label}</label>
        }
        <div className="input-group">
          <input
            ref={input => this.setInputElement(input)}
            type="text"
            placeholder={placeholder}
            className={inputClassName}
            value={this.state.value}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
            onFocus={() => this.toggleEditing(true)}
          />
          <div className="input-group-append">
            <span onClick={this.handleGetAllSuggestions} className="input-group-text">show All</span>
          </div>
        </div>
        {
          this.state.editing && options.length > 0 && (value !== this.state.value || this.state.allSuggestion) &&
          <div className="selectInput-Options">
            {
              this.state.options.map((item, i) => {
                return (
                  <div
                  key={i}
                  className="selectInput-Option"
                  onClick={e => this.handleSetOptionValue(item)}
                  >
                    {item.label}
                  </div>
                )
              })
            }
          </div>
        }
        {error &&
          <div className="text-danger">{errorText}</div>
        }
      </div>
    );
  }
}

export default enhanceWithClickOutside(AutoSuggest);

AutoSuggest.defaultProps = {
  label: '',
  inputClassName: '',
  placeholder: '',
  options: [],
  onChange: () => { },
  onOptionSelect: () => { },
};
