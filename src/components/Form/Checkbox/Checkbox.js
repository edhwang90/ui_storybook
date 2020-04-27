import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';

export const Checkbox = (props) => {
  const { data, id, label, toggleProp, handleToggle, disabled } = props;
  const [checked, setCheck] = useState(toggleProp)

  const checkToggle = () => {
    setCheck(!checked);
    handleToggle(data);
  }

  return (
    <div className="checkbox-container">
      <input className="checkbox" type="checkbox" 
      checked={checked} 
      id={'checkbox' + id} 
      onChange={checkToggle}
      disabled={disabled}/>
      <label htmlFor={'checkbox' + id}><span>{label}</span></label>
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}