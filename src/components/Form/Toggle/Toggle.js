import React, { useState, memo, useRef } from 'react';
import PropTypes from 'prop-types';

import './Toggle.scss';

export const useToggle = (props) => {
  const { type, className, toggleFor, value, handleToggle, disabled } = props;
  const [toggled, setToggled] = useState(value || false);

  const toggle = (e) => {
    setToggled(!toggled);
    handleToggle(!toggled);
  }

  return {
    type,
    className,
    toggled,
    toggleFor,
    toggle,
    disabled
  }
}

export const Toggle = memo((props) => {
  const { type, className, toggled, toggleFor, toggle, disabled } = useToggle(props);

  const toggleRef = useRef(null);

  const handleToggle = () => {
    toggleRef.current.focus();
    toggle();
  }

  const handleKeyDown = (e) => {
    // key: space
    if (e.keyCode === 32) {
      toggle();
    }
  }

  return (
    <React.Fragment>
      <input className={type} type="checkbox"
             checked={toggled} 
             value={toggled}
             id={toggleFor}
             onChange={handleToggle}
             disabled={disabled}/>
      <span className={className} 
            ref={toggleRef}
            role="button"
            tabIndex="0"
            onKeyDown={handleKeyDown}
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
  disabled: false
}