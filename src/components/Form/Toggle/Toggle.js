import React, { useState, memo } from 'react';
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
  
  const handleToggle = () => {
    if (disabled) return;
    toggle();
  }

  return (
    <React.Fragment>
      <input className={type} type="checkbox"
             checked={toggled} 
             value={toggled}
             id={toggleFor}
             onBlur={onBlur}
             onChange={handleToggle}
             disabled={disabled}/>
      <span className={className} 
            tabIndex="-1"
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