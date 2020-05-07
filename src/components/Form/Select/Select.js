import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { filterObjectArray, traverseNodes } from '../../Utils';

import './Select.scss';

export const useSelect = (props) => {
  const { className, label, value, options, attr, onClick, isMultiSelect, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(isMultiSelect ? value ? value : [] : value);

  const getOptionDisplay = (selected) => {
    return attr ? selected[attr] : selected
  }

  const filteredList = () => {
    const selections = isMultiSelect ? selected : [selected];
    if (attr) return filterObjectArray(options, selections, attr);
    else {
      return options.filter(option => !selections?.find(filter => option === filter));
    } 
  }

  const toggleSelect = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  }
  
  const closeSelect = () => {
    setIsOpen(false);
  }

  const handleClick = (option) => {
    if (isMultiSelect) {
      setSelected([...selected, option]);
      onClick([...selected, option])
    }
    else {
      setSelected(option);
      onClick(option);
      toggleSelect();
    }
  }



  const resetSelect = (e) => {
    e.stopPropagation();
    const updated = isMultiSelect ? [] : '';
    setSelected(updated);
    onClick(updated);
  }

  const removeSelection = (e, toRemove) => {
    e.stopPropagation();
    const removeIndex = selected.findIndex(item => getOptionDisplay(item) === getOptionDisplay(toRemove))
    const updated = [
      ...selected.slice(0, removeIndex),
      ...selected.slice(removeIndex+1)
    ]
    setSelected(updated);
    onClick(updated);
  }

  return {
    className,
    label,
    disabled,
    isMultiSelect,
    isOpen,
    selected,
    getOptionDisplay,
    toggleSelect,
    closeSelect,
    filteredList,
    resetSelect,
    handleClick,
    removeSelection
  }
}

export const Select = memo((props) => {
  const { className,
          label,
          disabled,
          isMultiSelect, 
          isOpen, 
          selected,
          getOptionDisplay,
          toggleSelect, 
          closeSelect,
          filteredList,
          resetSelect,
          handleClick,
          removeSelection  } = useSelect(props);

  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const listRef = useRef(null);

  const onOutsideClick = e => {
    if (menuRef.current.contains(e.target)) {
      return;
    }

    closeSelect();
    // unbind
    document.removeEventListener('click', onOutsideClick);
  };

  const handleSelect = (e) => {
    if (!isOpen) {
      btnRef.current.focus();
    }
    toggleSelect();
    document.addEventListener('click', onOutsideClick);
  }

  const handleSelectEnter = (e) => {
    if (e.keyCode === 13) {
      toggleSelect();
    }
  }

  const handleKeyDown = (e, option) => {
    // key: enter
    if (e.keyCode === 13) {
      e.stopPropagation();
      handleClick(option);
    }
    else if (e.keyCode === 27) {
      closeSelect();
    }
  }

  // Display purposes: Multiselect vs Select
  const labelUI = () => {
    if (isMultiSelect) {
      return selected.length > 0
        ? 
          (
            selected.map((selection, k) => (
              <div key={k} className="selected">
                <span>{getOptionDisplay(selection)}</span>
                <button className="remove-selected"
                        onClick={(e) => removeSelection(e, selection)}
                        type="button">
                  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                </button>
              </div>
            ))
          )
        : <span className="not-selected">{label}</span>
    }
    else {
      return selected 
        ? getOptionDisplay(selected)
        : label
    }
  }

  const clearUI = () => {
    const clearAllBtn = (
      <button className="select-clear" onClick={resetSelect} type="button">
        <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
      </button>
    );
    if (isMultiSelect && selected.length > 0) {
      return clearAllBtn
    }
    else if (!isMultiSelect && selected) {
      return clearAllBtn
    }
  }

  const listUI = () => (
    isOpen &&
    <ul tabIndex="0" className="select-list" ref={listRef} onKeyDown={e => traverseNodes(e, listRef, 'li')}>
    {
      filteredList().length > 0
      ? (
          filteredList().map((option, index) => (
            <li key={index} tabIndex="0" onKeyDown={e => handleKeyDown(e, option)} onClick={e => handleClick(option)}>
              {getOptionDisplay(option)}
            </li>
          ))
        )
      : <li>No available options.</li>
    }
    </ul>
  )

  return (
    <div onKeyDown={handleSelectEnter} ref={menuRef} className={ isMultiSelect ? `multi-select-container ${selected.length > 0 ? 'show-selected' : ''}`: `select-container`}>
      <div className={`select-btn${ isOpen ? ' list-open' : '' }${ disabled ? ' list-disabled' : ''} ${className}`}
           ref={btnRef}
           role="button"
           tabIndex="0"
           onClick={handleSelect}>
        <div className="select-display">
          {labelUI()}
        </div>

        <div className="select-actions">
          {
            clearUI()
          }
          <button className="select-chevron" type="button">
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </button>
        </div>
      </div>

      { listUI() }
    </div>
  )
});

Select.propTypes = {
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  attr: (props, propName, componentName) => {
          if (props['options'][0] instanceof Object && (props[propName] === undefined || typeof(props[propName]) !== 'string')) {
            return new Error(`Please provide an ${propName} for display purposes.`)
          }
        },
  isMultiSelect: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

Select.defaultProps = {
  label: 'Select...',
  isMultiSelect: false,
  required: false,
  disabled: false
}