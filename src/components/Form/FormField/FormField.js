import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './FormField.scss';

export const FormField = (props) => {
  const { onChange } = props;

  return (
    <React.Fragment>
      <div className="input-container">
          {
            React.Children.map(props.children, child => {
              if (child.type === 'input') {
                return (
                  React.cloneElement(child, {
                    onChange: onChange,
                  })
                )
              }
              else {
                return child
              }
            })
          }
      </div>
    </React.Fragment>
  )
} 

FormField.propTypes = {
  onChange: PropTypes.func.isRequired,
  validateOnChange: PropTypes.bool,
  errorMessage: PropTypes.string
}