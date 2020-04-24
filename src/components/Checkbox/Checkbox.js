import React, { useState } from 'react';

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