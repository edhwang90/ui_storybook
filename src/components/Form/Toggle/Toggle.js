import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './Toggle.scss';

export const useToggle = (props) => {
  const { value, toggleGroupValue, handleToggle, type } = props;
  
  const [isToggled, setIsToggled] = useState(value);

  useEffect(() => {
    // if standard switch or checkbox
    if (toggleGroupValue == null) return;
    // if radio group
    else if (!Array.isArray(toggleGroupValue)) {
      setIsToggled(toggleGroupValue === value);
    }
    // if checkbox or switch group
    else {
      setIsToggled(toggleGroupValue.indexOf(value) >= 0)
    }
  }, [value, toggleGroupValue])

  const toggle = () => {
    // if default boolean toggle
    if (toggleGroupValue === null || typeof toggleGroupValue === 'undefined') {
      setIsToggled(!isToggled);
      handleToggle(!isToggled);
    }
    else if (type === 'radio') {
      handleToggle(value);
    }
    else {
      // check if it exists
      const existingIndex = toggleGroupValue.indexOf(value);
      if (existingIndex < 0) {
        handleToggle([...toggleGroupValue, value]);
      }
      else {
        handleToggle([
          ...toggleGroupValue.slice(0, existingIndex),
          ...toggleGroupValue.slice(existingIndex+1)
        ])
      }
    }
  }
  
  return {
    toggle,
    isToggled
  }
}

export const Toggle = (props) => {
  const { toggle, isToggled } = useToggle(props);
  const { value, type, toggleFor, onBlur,
          className, disabled } = props;
  
  const inputType = (type === 'checkbox' || type === 'switch') ? 'checkbox' : 'radio';
  const toggleRef = useRef(null);

  const handleToggle = () => {
    if (disabled) return;
    toggleRef.current.focus();
    toggle();
  }

  return (
    <React.Fragment>
      <input className={`${type} ${className}`} 
             type={inputType}
             ref={toggleRef}
             checked={isToggled} 
             value={value}
             id={toggleFor}
             name={toggleFor}
             onBlur={onBlur}
             onChange={handleToggle}
             disabled={disabled}/>
      <span className={className}
            onClick={handleToggle}></span>
    </React.Fragment>
  )
};

Toggle.propTypes = {
  /** Can be: 'checkbox', 'switch', 'radio' */
  type: PropTypes.string.isRequired,
  /** Serves as unique identifier while matching label to input */
  toggleFor: PropTypes.string.isRequired,
  /** Click handler*/
  handleToggle: PropTypes.func.isRequired,
  /** Truthy value for single switch/checkbox, else any primitive */
  value: PropTypes.any,
  /** Form value to replace or update for radio or grouped switch/checkbox */
  toggleGroupValue: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

Toggle.defaultProps = {
  value: false,
  toggleGroupValue: null,
  disabled: false,
  className: ''
}