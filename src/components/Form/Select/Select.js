import React, { useState, useRef, memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { traverseNodes } from '../../Utils';

import { useSearch } from '../../Search';

import './Select.scss';

export const useSelect = (props) => {
  const { options, value, attr, onClick, onBlur, isMultiSelect, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(isMultiSelect ? value ? value : [] : value);
  const [searchParam, setSearchParam] = useState('');

  const { search } = useSearch();
  const initialMount = useRef(true);

  const onBlurCallback = useCallback(() => {
    if (onBlur) onBlur();
  }, [isOpen])

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    
    if (!isOpen) onBlurCallback();
  }, [isOpen, initialMount, onBlurCallback]);

  const getOptionDisplay = (selected) => {
    return attr ? selected[attr] : selected
  }

  const filteredList = () => {
    const selections = isMultiSelect ? selected : [selected];
    const toSearch = searchParam ? searchParam.toLowerCase() : '';

    return search(options, toSearch)
            .filter(option => !selections?.find(filter => getOptionDisplay(option) === getOptionDisplay(filter)))
  }

  const filteredGroupList = () => {
    const selections = isMultiSelect ? selected : [selected];
    const toSearch = searchParam ? searchParam.toLowerCase() : '';

    const list = options;
    for (let option of list) {
      option.options = search(option.options, toSearch).filter(filter => !selections.find(find => (getOptionDisplay(filter) === getOptionDisplay(find)) && option.label === find.group?.label));
    }
    
    return options;
  }

  const isResetAvailable = () => {
    return selected?.some(filter => !filter.isFixed);
  }

  const closeSelect = () => {
    setIsOpen(false);
  }

  const openSelect = () => {
    setIsOpen(true);
  }

  const clickSelect = (option) => {
    if (isMultiSelect) {
      setSelected([...selected, option]);
      onClick([...selected, option]);
    }
    else {
      setSelected(option);
      onClick(option);
    }
  }

  const resetSelect = (e) => {
    e.stopPropagation();
    if (disabled) return;

    if (!isMultiSelect) {
      setSelected('');
      onClick('');
      return;
    }
    else {
      let updated = selected;
      updated = updated.filter(find => find.isFixed);
      setSelected(updated);
      onClick(updated);
    }
  }

  const removeSelection = (e, toRemove) => {
    e.stopPropagation();
    if (disabled) return;
  
    const updated = selected.filter(find => getOptionDisplay(find) !== getOptionDisplay(toRemove));

    setSelected(updated);
    onClick(updated);
    
  }

  return {
    selected,
    isOpen,
    getOptionDisplay,
    filteredList,
    filteredGroupList,
    isResetAvailable,
    closeSelect,
    openSelect,
    resetSelect,
    clickSelect,
    setSearchParam,
    removeSelection
  }
}

export const Select = memo((props) => {
  const { selected,
          isOpen,
          getOptionDisplay,
          filteredList,
          filteredGroupList,
          isResetAvailable,
          closeSelect,
          openSelect,
          resetSelect,
          clickSelect,
          setSearchParam,
          removeSelection  } = useSelect(props);
  
  const { disabled, isMultiSelect, isGrouped, onBlur,
          className, label, selectRow, groupedRow } = props;

  const [indexOfLast, setIndexOfLast] = useState(null);
  const menuRef = useRef(null);
  const listRef = useRef(null); // for Accessible traversing
  const selectedRef = useRef(null); // for Accessible traversing

  // for Accessible traversion: auto focus to list after open
  useEffect(() => {
    if (listRef.current) listRef.current.querySelector('.select-option').focus();
  }, [isOpen, listRef])

  const closeAndBlur = () => {
    closeSelect();
    menuRef.current.querySelector('.select-btn').blur();
  }

  const openAndFocus = (e) => {
    if (disabled) return;
    if (!e) return;
    openSelect();

    // auto focus for traversing list
    if (listRef.current) listRef.current.querySelector('.select-option').focus();
    
    // bind outside click event
    document.addEventListener('click', onOutsideClick);
  }

  const resetFocus = (e) => {
    e.target.focus();
  }

  const onSearch = (e) => {
    e.stopPropagation();
    setSearchParam(e.key);
    menuRef.current.querySelector('.select-btn').focus();
  }

  // single key short cut to option
  const skipTo = (e) => {
    let indexOfOption;
    let allOptions = [];

    if (!isGrouped) {
      allOptions = [...filteredList()];
    }
    else {
      const groupedOptions = filteredGroupList();
      for (let i = 0; i<groupedOptions.length; i++) {
        allOptions = [...allOptions, ...groupedOptions[i].options]

      }
    }

    indexOfOption = allOptions.findIndex(find => getOptionDisplay(find).toLowerCase().startsWith(e.key.toLowerCase()));
    
    if (indexOfOption === indexOfLast) {
      indexOfOption = allOptions.findIndex((find, i) => {
        if (i !== indexOfOption && (getOptionDisplay(find).toLowerCase().startsWith(e.key.toLowerCase()))) {
          return find
        }
      })
    }

    setIndexOfLast(indexOfOption);
    if (indexOfOption >= 0) listRef.current.querySelectorAll('.select-option')[indexOfOption].focus();
  }

  const onOutsideClick = e => {
    const path = e.path || e.composedPath();
    if (path.indexOf(menuRef.current) >= 0) {
      return;
    }

    closeAndBlur();
    
    // unbind
    document.removeEventListener('click', onOutsideClick);
  };

  // tab: to clear all
  const keydownToClear = () => {
    const clear = menuRef.current.querySelector('.select-clear');
    if (clear) clear.focus();
  }

  // Accessibility: handle selection and escape
  const handleKeyDown = (e, option) => {
    // tab/escape: close and blur
    if ((e.keyCode === 9) || e.keyCode === 27) {
      onBlur();
      closeAndBlur();
    }
    // arrow down: open and focus on list
    else if (e.keyCode === 40) {
      e.preventDefault();
      openAndFocus(e);
      if (listRef.current) listRef.current.querySelector('.select-option').focus();
    }
    // arrow right: to selected
    else if (e.keyCode === 39) {
      const displayedOptions = selectedRef.current?.querySelector('.remove-selected');
      if (displayedOptions) displayedOptions.focus();
    }
    // arrow left: to most recent selected
    else if (e.keyCode === 37) {
      const displayedOptions = Array.from(selectedRef.current?.querySelectorAll('.remove-selected') || []);
      const toIndex = displayedOptions.length - 1 < 0 ? 0 : displayedOptions.length -1;
      if (displayedOptions.length > 0) displayedOptions[toIndex].focus();
    }
    // hand click
    else if ((e.keyCode === 13 || e.keyCode === 32) && option) {
      e.preventDefault();
      handleClick(option);

      // hack: to fix tabbing/focus error for choosing last item of group and/or list
      if (isMultiSelect) {
        if (e.target.previousSibling) {
          e.target.previousSibling.focus();
        }
        else if (!e.target.nextSibling) {
          menuRef.current.querySelector('.select-btn').focus();
        }
      }
    }
    // alpha numeric: filter
    else if (e.keyCode >= 48 && e.keyCode <= 90) {
      skipTo(e);
    }
  }

  const handleClick = (option) => {
    clickSelect(option);
    if (!isMultiSelect) {
      closeSelect();
      menuRef.current.querySelector('.select-btn').focus();
    }
  }

  const handleRemove = (e, selection) => {
    removeSelection(e, selection);
    if (listRef.current) listRef.current.querySelector('.select-option').focus();
  }

  // Accessibility: handle traversal and list, toggle between
  //                list and selected
  const traverseSelect = (e) => {
    if (selectedRef.current) traverseNodes(e, selectedRef, '.remove-selected', keydownToClear, true); 
    if (listRef.current) traverseNodes(e, listRef, '.select-option', closeAndBlur)
  }
  
  const selectedTagUI = (index, selection) => (
    <div key={index}
         className="selected">
      <span className={selection.isFixed ? 'fixed' : ''}>{getOptionDisplay(selection)}</span>
      {
        !selection.isFixed &&
        <button className="btn remove-selected"
                id={index}
                tabIndex="-1"
                disabled={disabled}
                onClick={(e) => handleRemove(e, selection, index)}
                type="button"
                aria-label="Remove selection">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
        </button>
      }
    </div>
  )

  // Display purposes: Multiselect vs Select
  const labelUI = () => {
    if (!isMultiSelect) {
      return selected 
        ? getOptionDisplay(selected)
        : label
    }
    else {
      return selected.length > 0
      ? 
        (
          <div className="select-display" ref={selectedRef}
                onKeyDown={e => traverseSelect(e, selectedRef, 'button', keydownToClear, true)}>
            { 
              selected.map((selection, k) => (
                selectedTagUI(k, selection)
              ))
            }
          </div>
        )
      : <span className="not-selected">{label}</span>
    }
  }

  const clearUI = () => {
    const clearAllBtn = (
      <React.Fragment>
        <button className="btn is-clear select-clear" 
                onClick={resetSelect} 
                type="button"
                disabled={disabled}
                aria-label="Clear all selections">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
        </button>
        <span></span>
      </React.Fragment>
    );
    if (!isMultiSelect && selected) {
      return clearAllBtn
    }
    else if (isMultiSelect && isResetAvailable()) {
      return clearAllBtn
    }
  }

  const emptySelect = () => (
    <li tabIndex="0" onKeyDown={handleKeyDown} className="select-option empty">No available options.</li>
  )

  const rowUI = (option, index) => {
    if (!selectRow) {
      return (
        <li key={index} 
            tabIndex="0"
            className="select-option available"
            onMouseEnter={e => resetFocus(e)}
            onKeyDown={e => handleKeyDown(e, option)} 
            onClick={e => handleClick(option)}
            aria-label={`Select option ${getOptionDisplay(option)}`}>
          {getOptionDisplay(option)}
        </li>
      )
    }
    else {
      const customRow = selectRow(getOptionDisplay(option));
      return React.cloneElement(customRow, {
        tabIndex: "0",
        key: index,
        className: `select-option available ${customRow.props.className}`,
        onKeyDown: e => handleKeyDown(e, option),
        onClick: e => handleClick(option),
        onMouseEnter: e => resetFocus(e),
        'aria-label': `Select option ${getOptionDisplay(option)}`
      })
    }
  }

  const groupRowUI = (group, index) => {
    if (!groupedRow) {
      return <label className="group-label" key={index}>{group.label}</label>
    }
    else {
      return React.cloneElement(groupedRow(group), {
        key: index,
        className: `group-label ${groupedRow(group).props.className}`,
        'aria-label': `Options group`
      })
    }
  }

  const listUI = () => {
    if (isOpen && !isGrouped) {
      return (
        <ul className="select-list" 
            ref={listRef} 
            onKeyDown={e => traverseSelect(e)}>
          {   
            filteredList().length > 0 &&
            filteredList().map((option, index) => (
              rowUI(option, index)
            ))
          }
          {
            filteredList().length <= 0 &&
            emptySelect()
          }
        </ul>
      )
    }
    else if (isOpen && isGrouped) {
      return (
        <div className="select-list" 
             ref={listRef}>
          {
            filteredGroupList().map((group, i) => (
              <React.Fragment key={i}>
                {groupRowUI(group)}
                {
                  <ul onKeyDown={e => traverseSelect(e)}>
                    {
                      group.options.length > 0 &&
                      group.options.map((option, j) => {
                        const groupDetails = Object.assign({}, group);
                        delete groupDetails.options;
                        return rowUI({...option, group: groupDetails}, j);
                      })
                    }
                    {
                      group.options.length <= 0 &&
                      emptySelect()
                    }
                  </ul>
                }
              </React.Fragment>
            ))
          }
        </div>
      )
    }
  } 

  return (
    <div ref={menuRef}
         className={ isMultiSelect ? `multi-select-container ${selected.length > 0 ? 'show-selected' : ''}`: `select-container`}>
      <div className={`select-btn${ isOpen ? ' list-open' : '' }${ disabled ? ' list-disabled' : ''} ${className}`}
           onKeyDown={handleKeyDown}
           onClick={openAndFocus}
           tabIndex="0"
           aria-label="Toggle select list">
        <div>
          {labelUI()}
          {/* <input className="select-search" onKeyDown={accessKeyDown} onChange={onSearch} type="text" placeholder="Select..."></input> */}
        </div>

        <div className="select-actions">
          {
            clearUI()
          }
          <div className="select-chevron">
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </div>
        </div>
      </div>

      { listUI() }
    </div>
  )
});

Select.propTypes = {
  options: (props, propName, componentName) => {
    if (props['isGrouped']) {
      if (!props['options']?.[0]['options']) {
        return new Error(`Please structure the grouped list to have an array of 'options' to iterate over.`);
      }
    }
  },
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  attr: (props, propName, componentName) => {
    // if (props['options']?.[0] instanceof Object && (props[propName] === undefined || typeof(props[propName]) !== 'string')) {
    //   return new Error(`Please provide an ${propName} for display purposes.`)
    // }
  },
  selectRow: PropTypes.func,
  groupedRow: PropTypes.func,
  isMultiSelect: PropTypes.bool,
  isGrouped: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

Select.defaultProps = {
  label: 'Select...',
  isMultiSelect: false,
  isGrouped: false,
  required: false,
  disabled: false
}