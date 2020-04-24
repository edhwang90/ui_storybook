import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

export const Input = (props) => {
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
    <div className="input-container">
        <input className="input" {...props} onBlur={handleChange} onChange={handleChange} />
        <span className="error-message">{error}</span>
    </div>

  )
}