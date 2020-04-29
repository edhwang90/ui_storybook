import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      <div className="input-container">
          {
            React.Children.map(props.children, child => {
              if (child.type === 'input') {
                return (
                  React.cloneElement(child, {
                    onChange: handleChange,
                    onBlur: handleChange
                  })
                )
              }
              else {
                return child
              }
            })
          }
      </div>
      <span className="error-message">{error}</span>
    </React.Fragment>
  )
} 