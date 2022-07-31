import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Toaster.scss';

export const Toaster = (props) => {
  const { children, className, timer, isPermanent, canDismiss, show } = props;

  const [isVisible, setIsVisible] = useState(true);

  const visibleStyles = {
    display: 'block'
  }

  const dismissedStyles = {
    display: 'none'
  }

  const onToastClick = () => {
    if (canDismiss) {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    setIsVisible(show);
    
    if (!isPermanent) {
      setTimeout(() => {
        setIsVisible(false)
      }, timer ? timer : 5000)
    }
  }, [show])

  return (
    <div className={"toaster-container"+ " " + className }
         style={isVisible ? visibleStyles : dismissedStyles}
         onClick={onToastClick}>
      { children }
    </div>
  )
}

Toaster.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isPermanent: PropTypes.bool,
  canDismiss: PropTypes.bool,
  show: PropTypes.bool,
  timer: PropTypes.number
}

Toaster.defaultProps = {
  className: 'toast-default',
  isPermanent: false,
  canDismiss: true,
  show: false,
  timer: 5000
}