import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

export const ProgressBar = (props) => {
  const { completed, bgColor } = props;

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: `${ bgColor ? bgColor : '#28a745'}`,
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-bar"
           style={fillerStyles}></div>
    </div>
  )
}

ProgressBar.defaultProps = {
  completed: PropTypes.number,
  bgColor: PropTypes.string
}