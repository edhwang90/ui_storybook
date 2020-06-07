import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './LoadingIcon.scss';

export const LoadingIcon = memo((props) => {
  const { className } = props;

  return <div className={`lds-ring ${className}`}><div></div><div></div><div></div><div></div></div>
});

LoadingIcon.propTypes = {
  className: PropTypes.string
}

LoadingIcon.defaultProps = {
  className: ''
}