import React, { useState, memo, useRef } from 'react';
import PropTypes from 'prop-types';

import './Toggle.scss';

export const useToggle = (props) => {
  const { value, handleToggle } = props;
  const [toggled, setToggled] = useState(value || false);

  const toggle = (e) => {
    setToggled(!toggled);
    handleToggle(!toggled);
  }
  
  return {
    toggled,
    toggle,
  }
}

export const Toggle = memo((props) => {
  const { toggled, toggle } = useToggle(props);
  const { type, className, toggleFor, disabled, onBlur } = props;
  
  const checkboxRef = useRef(null);

  const handleToggle = () => {
    if (disabled) return;
    checkboxRef.current.focus();
    toggle();
  }

  return (
    <React.Fragment>
      <input className={type} type="checkbox"
             ref={checkboxRef}
             checked={toggled} 
             value={toggled}
             id={toggleFor}
             onBlur={onBlur}
             onChange={handleToggle}
             disabled={disabled}/>
      <span className={className}
            onClick={handleToggle}></span>
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
  disabled: false,
  className: ''
}