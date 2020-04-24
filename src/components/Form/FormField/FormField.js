import React, { useState } from 'react';

import './FormField.scss';

export const FormField = (props) => {
  const { onChange, validateOnChange, errorMessage } = props;

  const [error, setError] = useState(errorMessage);

  const handleChange = (e) => {
    e.preventDefault();
    if (validateOnChange) setError(e.target.validationMessage);
    else {
      e.target.oninvalid = (e) => {
        e.preventDefault();
  
        setError(e.target.validationMessage);
      }
    }

    onChange(e);
  }

  return (
    <React.Fragment>
        {
          React.Children.map(props.children, child => (
            React.cloneElement(child, {
              onChange: handleChange,
              onBlur: handleChange,
              validateOnChange: validateOnChange
            })
          ))
        }
        <span className="field-error-message">{error}</span>
    </React.Fragment>
  )
} 