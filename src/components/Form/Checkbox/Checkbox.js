import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { generateNumber } from '../../Utils';

import './Checkbox.scss';

const useCheckbox = (props) => {
  const { label, value, handleToggle, disabled } = props;
  const [checked, setCheck] = useState(value || false);

  const id = generateNumber();

  const checkToggle = () => {
    setCheck(!checked);
    handleToggle(!checked);
  }

  return {
    id,
    checked,
    label,
    checkToggle,
    disabled
  }
}

const CheckboxUI = (props) => {
  const { id, checked, label, checkToggle, disabled } = useCheckbox(props);

  return (
    <div className="checkbox-container">
      <input className="checkbox" type="checkbox" 
      checked={checked} 
      value={checked}
      id={'checkbox' + id}
      onChange={checkToggle}
      disabled={disabled}/>
      <label htmlFor={'checkbox' + id}><span>{label}</span></label>
    </div>
  )
}

CheckboxUI.propTypes = {
  label: PropTypes.string.isRequired
}

export const Checkbox = memo(CheckboxUI);