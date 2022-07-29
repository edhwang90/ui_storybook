import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useHeightAnimation } from '../Animate';
import { generateNumber } from '../../Utils';

import './Expandable.scss'

export const Expandable = (props) => {
  const { children, className } = props;
  
  const [identifier] = useState(generateNumber());

  const contentRef = useRef(null);

  const { isOpen, toggleHeight } = useHeightAnimation({...props, contentRef});

  return (
    <div className={`expandable-container ${className}`}>
      <div className="expandable-row">
        <button className={`expandable-lbl-toggle ${isOpen ? 'expanded' : 'collapsed'}`}
                onClick={toggleHeight}
                type="button"
                tabIndex="0"
                aria-expanded={isOpen}
                data-toggle={isOpen ? 'collapse' : 'expand'}
                aria-controls={`Section${identifier}`}>{children[0]}</button>
      </div>
      
      <div id={`Section${identifier}`} 
           ref={contentRef}
           className={`expandable-content ${isOpen ? 'expanded' : 'collapsed'}`}>
          <div>{ children[1] }</div>
      </div>
    </div>
  )
}

Expandable.propTypes = {
  /** Expandable content: first must be expandable label/button, second must be shown/hidden content */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool
}

Expandable.defaultProps = {
  className: '',
  isOpen: false
}