import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Toaster.scss';

export const Toaster = (props) => {
  const { children, className, timer, dismissable } = props;

  const [isVisible, setIsVisible] = useState(true);

  const visibleStyles = {
    display: 'none'
  }

  const dismissedStyles = {
    display: 'block'
  }

  const onToastClick = () => {
    setIsVisible(false);
  }

  useEffect(() => {
    if (dismissable) {
      setTimeout(() => {
        setIsVisible(false)
      }, timer ? timer : 5000)
    }
  }, [isVisible])

  return (
    <div className={"toaster-container"+ " " + className }
         style={isVisible ? dismissedStyles : visibleStyles}
         onClick={onToastClick}>
      { children }
    </div>
  )
}

Toaster.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dismissable: PropTypes.bool,
  timer: PropTypes.number
}

Toaster.defaultProps = {
  className: 'toast-default',
  dismissable: true,
  timer: 5000
}