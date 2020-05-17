import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { generateNumber } from '../Utils';

import './Expandable.scss'

export const useExpandable = (props) => {
  const { isExpanded } = props;
  const [isOpen, setIsOpen] = useState(isExpanded || false);

  const toggleExpandable = () => {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggleExpandable    
  }
}

export const Expandable = (props) => {
  const { children, className, maxHeight } = props;
  const { isOpen, toggleExpandable } = useExpandable(props);
  const [identifier] = useState(generateNumber());

  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      if (maxHeight) {
        contentRef.current.style.maxHeight = `${maxHeight}px`;
        contentRef.current.style.overflow = 'auto';
      }
      else {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      }
    }
    else if (!isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen, maxHeight, contentRef])

  return (
    <div className={`expandable-container ${className}`}>
      <button className={`expandable-lbl-toggle ${isOpen ? 'expanded' : 'collapsed'}`}
         onClick={toggleExpandable}
         type="button"
         tabIndex="0"
         aria-expanded={isOpen}
         data-toggle={isOpen ? 'collapse' : 'expand'}
         aria-controls={`Section${identifier}`}>{children[0]}</button>
      
      <div id={`Section${identifier}`} 
           ref={contentRef}
           className={`expandable-content ${isOpen ? 'expanded' : 'collapsed'}`}>
          <div>{ children[1] }</div>
      </div>
    </div>
  )
}

Expandable.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isExpanded: PropTypes.bool
}

Expandable.propTypes = {
  children: PropTypes.node.isRequired,
}

Expandable.defaultProps = {
  className: '',
  isExpanded: false
}