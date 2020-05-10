import React from 'react';

export const SelectItem = (props) => {
  const { }
  return (
    React.Children.map(props.children, child => {
        return (
          React.cloneElement(child, {
            onChange: handleChange,
            onBlur: handleChange
          })
        )
    })
  )
}