import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { filterObjectArray } from '../../../lib/utils';

import './Select.scss';

export const Select = (props) => {
  const { label, value, options, attr, onClick, isMultiSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(isMultiSelect ? value ? value : [] : value);
  const menuRef = useRef(null);

  const getOptionDisplay = (selected) => {
    return attr ? selected[attr] : selected
  }

  const filteredList = () => {
    const selections = isMultiSelect ? selected : [selected];
    if (attr) return filterObjectArray(options, selections, attr);
    else {
      return options.filter(option => !selections.find(filter => option === filter));
    } 
  }

  useEffect(() => {
    const hideSelect = e => {
      if (menuRef.current.contains(e.target)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('click', hideSelect);
    return () =>  {document.removeEventListener('click', hideSelect) };
  }, [menuRef])

  useEffect(() => {
    onClick(selected);
  }, [selected, onClick])

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  }

  const handleClick = (option) => {
    if (isMultiSelect) {
      setSelected([...selected, option]);
    }
    else {
      setSelected(option);
      toggleSelect();
    }
  }

  const resetSelect = (e) => {
    e.stopPropagation();
    setSelected(isMultiSelect ? [] : '');
  }

  const removeSelection = (e, toRemove) => {
    e.stopPropagation();
    const removeIndex = selected.findIndex(item => getOptionDisplay(item) === getOptionDisplay(toRemove))

    setSelected([
      ...selected.slice(0, removeIndex),
      ...selected.slice(removeIndex+1)
    ]);
  }

  // Display purposes: Multiselect vs Select
  const uiLabel = () => {
    if (isMultiSelect) {
      return selected.length > 0
        ? 
          (
            selected.map((selection, k) => (
              <div key={k} className="selected">
                <span>{getOptionDisplay(selection)}</span>
                <button className="remove-selected"
                        onClick={(e) => removeSelection(e, selection)}>
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

  const uiClear = () => {
    const clearAllBtn = (
      <button className="select-clear" onClick={resetSelect}>
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

  return (
    <div ref={menuRef} className={ isMultiSelect ? `multi-select-container ${selected.length > 0 ? 'show-selected' : ''}`: 'select-container'}>
      <div className={`select-btn${ isOpen ? ' list-open' : '' }`}
            onClick={toggleSelect}>
        <div className="select-display">
          {uiLabel()}
        </div>

        <div className="select-actions">
          {
            uiClear()
          }
          <button className="select-chevron">
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </button>
        </div>
      </div>

      {
        isOpen &&
        <ul className="select-list">
        {
          filteredList().length > 0
          ? (
            filteredList().map((option, index) => (
                <li key={index}
                    onClick={e => handleClick(option)}>{getOptionDisplay(option)}</li>
              ))
            )
          : <li>No available options.</li>
        }
        </ul>
      }
    </div>
  )
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.any,
  attr: (props, propName, componentName) => {
          if (props['options'][0] instanceof Object && (props[propName] === undefined || typeof(props[propName]) !== 'string')) {
            return new Error(`Please provide an ${propName} for display purposes.`)
          }
        },
  isMultiSelect: PropTypes.bool,
  required: PropTypes.bool
}