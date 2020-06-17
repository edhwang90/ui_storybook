import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const useHeightAnimation = (props) => {
  const { isExpanded, contentRef, maxHeight } = props;
  const [isOpen, setIsOpen] = useState(isExpanded || false);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight > maxHeight ? maxHeight : contentRef.current.scrollHeight}px`;
      contentRef.current.scrollTop = 0;
    }
    else if (!isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen, maxHeight, contentRef])

  const toggleHeight = () => {
    setIsOpen(!isOpen);
  }

  const setHeight = (toState) => {
    setIsOpen(toState);
  }

  return {
    isOpen,
    toggleHeight,
    setHeight    
  }
}

useHeightAnimation.propTypes = {
  contentRef: PropTypes.node.isRequired,
  isExpanded: PropTypes.bool,
  maxHeight: PropTypes.number
}

useHeightAnimation.defaultProps = {
  isExpanded: false
}