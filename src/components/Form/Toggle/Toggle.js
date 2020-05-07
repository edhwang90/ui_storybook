import React, { useState, memo, useRef } from 'react';
import PropTypes from 'prop-types';

import './Toggle.scss';

export const useToggle = (props) => {
  const { type, className, toggleFor, value, handleToggle, disabled } = props;
  const [toggled, setToggled] = useState(value || false);

  const toggleRef = useRef(null);

  const toggle = (e) => {
    toggleRef.current.focus();
    setToggled(!toggled);
    handleToggle(!toggled);
  }

  return {
    type,
    className,
    toggleRef,
    toggled,
    toggleFor,
    toggle,
    disabled
  }
}

export const Toggle = memo((props) => {
  const { type, toggleRef, className, toggled, toggleFor, toggle, disabled } = useToggle(props);

  return (
    <React.Fragment>
      <input className={type} type="checkbox"
             checked={toggled} 
             value={toggled}
             id={toggleFor}
             onChange={toggle}
             disabled={disabled}/>
      <span className={className} 
            ref={toggleRef}
            tabIndex="-1" // focus hack 
            onClick={toggle}></span>
    </React.Fragment>
  )
})

Toggle.propTypes = {
  type: PropTypes.string.isRequired,
  toggleFor: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
}

Toggle.defaultProps = {
  value: false,
  disabled: false
}