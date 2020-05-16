import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { generateNumber } from '../Utils';

import './Expandable.scss'

export const Expandable = (props) => {
  const { children, className } = props;
  const [identifier] = useState(generateNumber());

  return (
    <div className={`expandable-container ${className}`}>
      <input id={"Section" + identifier}
          className="expandable-toggle"
          type="checkbox"/>
    
      <label htmlFor={"Section" + identifier}
             className="expandable-lbl-toggle">
              {children[0]}
      </label>

      <div className="expandable-content">
          { children[1] }
      </div>
    </div>
  )
}

Expandable.propTypes = {
  children: PropTypes.node.isRequired,
}