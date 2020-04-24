import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

export const Button = (props) => {
  const { onClick, data, children, className, disabled } = props;

  const handleClick = (e) => {
    e.preventDefault();
    if (disabled) return;

    onClick(data);
  }

  return (
    <button className={`btn ${className ? className : ''}`} 
            onClick={(e) => handleClick(e)}
            disabled={disabled}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired
}