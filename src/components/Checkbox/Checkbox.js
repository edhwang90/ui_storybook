import React from 'react';

import './Checkbox.scss';

export const Checkbox = (props) => {
  const { id, label, toggleProp, handleToggle, disabled } = props;

  return (
    <div className="checkbox-container">
      <input className="checkbox" type="checkbox" 
      checked={toggleProp} 
      id={'checkbox' + id} 
      onChange={handleToggle}
      disabled={disabled}
      />
      <label htmlFor={'checkbox' + id}><span>{label}</span></label>
    </div>
  )
}