import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Toaster.scss';

export const useToaster = (props) => {
  const { show, canDismiss, isPermanent, timer } = props;

  const [isVisible, setIsVisible] = useState(show);

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

  return {
    isVisible,
    onToastClick
  }
}

export const Toaster = (props) => {
  const { children, className } = props;
  const { isVisible, onToastClick } = useToaster(props);

  const visibleStyles = {
    display: 'block'
  }

  const dismissedStyles = {
    display: 'none'
  }

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