import React, { useState, useRef, memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { traverseNodes, getKeyCode } from '../../../Utils';

import { useHeightAnimation } from '../../Animate';
import { useSearch } from '../../Search';

import { LoadingIcon } from '../../LoadingIcon';

import './Select.scss';

export const useSelect = (props) => {
  const { options, value, attr, onClick, onBlur, isMultiSelect, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(isMultiSelect ? value ? value : [] 
                                                         : value ? value : '');
  const [searchParam, setSearchParam] = useState('');

  const { search } = useSearch();
  const initialMount = useRef(true);

  // Caution: ignores lint rules for adding onBlur dependency
  //          doing so creates infinite loop.
  const onBlurCallback = useCallback(() => {
    if (onBlur) onBlur();
  }, [isOpen, selected])

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

  const filteredGroupList = (group) => {
    const selections = isMultiSelect ? selected : [selected];
    const toSearch = searchParam ? searchParam.toLowerCase() : '';

    const flattenedOptions = group.options.map(m => {
      const { options, ...otherDetails } = group;
      const withGroupDetails = { ...m , group: { ...otherDetails } };
      return withGroupDetails;
    });

    return search(flattenedOptions, toSearch).filter(filter => !selections.find(find => (getOptionDisplay(filter) === getOptionDisplay(find)) && group.label === find.group?.label))
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
    onBlurCallback,
    resetSelect,
    clickSelect,
    setSearchParam,
    removeSelection
  }
}

export const Select = (props) => {
  const { selected,
          isOpen,
          getOptionDisplay,
          filteredList,
          filteredGroupList,
          isResetAvailable,
          closeSelect,
          openSelect,
          //onBlurCallback,
          resetSelect,
          clickSelect,
          setSearchParam,
          removeSelection  } = useSelect(props);
  
  const { options, disabled, isMultiSelect, isGrouped, isClearable, onBlur,
          className, label, maxHeight, selectRow, groupedRow,
          isLoading } = props;

  const [lastFocused, setLastFocused] = useState(null);
  const menuRef = useRef(null);
  const listRef = useRef(null); // for Accessible traversing
  const selectedRef = useRef(null); // for Accessible traversing
  const { setHeight } = useHeightAnimation({ isExpanded: isOpen, contentRef: listRef, maxHeight }); // for animated Expand

  // for Accessible traversion: auto focus to list after open
  useEffect(() => {
    setHeight(isOpen);

    if (isOpen) {
      listRef.current.querySelector('.select-option').focus();
    }
  }, [isOpen, listRef])

  const closeAndFocus = () => {
    closeSelect();
    menuRef.current.querySelector('.select-btn').focus();
  }

  const openAndBind = (e) => {
    if (disabled) return;
    if (!e) return;
    openSelect();
    
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
    let allOptions = [];

    if (disabled) return;
    if (isMultiSelect && !listRef.current) return;

    if (!isGrouped) {
      allOptions = [...filteredList()];
    }
    else {
      // all grouped options to single array
      for (let group of filteredList()) {
        allOptions = [...allOptions, ...filteredGroupList(group)];
      }
    }

    // get index of first occurrence of match
    let indexOfOption = allOptions.findIndex(find => getOptionDisplay(find).toLowerCase().startsWith(e.key.toLowerCase()));
    const lastOption = indexOfOption >= 0 ? getOptionDisplay(allOptions[indexOfOption]) : null;

    // check for additional options and loop to next
    if (lastOption === lastFocused?.option && e.key === lastFocused?.key) {
      const nextOption = allOptions.findIndex((find, i) => {
        const toCompare = getOptionDisplay(find);
        if ((lastOption !== toCompare) && toCompare.toLowerCase().startsWith(e.key.toLowerCase())) {
          return find
        }
        return null;
      })

      // if no options retain focus
      indexOfOption = nextOption >= 0 ? nextOption : indexOfOption;
    }
    
    // if single select, auto select
    if (indexOfOption >= 0 && !isMultiSelect) {
      setLastFocused({ option: getOptionDisplay(allOptions[indexOfOption]), key: e.key });
      clickSelect(allOptions[indexOfOption]);
    }
    // if multiselect and list is open
    else if (indexOfOption >= 0) {
      
      setLastFocused({ option: getOptionDisplay(allOptions[indexOfOption]), key: e.key });
      listRef.current.querySelectorAll('.select-option')[indexOfOption].focus();
    }
  }

  const onOutsideClick = e => {
    const path = e.path || e.composedPath();
    if (path.indexOf(menuRef.current) >= 0) {
      return;
    }
    closeAndFocus();

    // unbind
    document.removeEventListener('click', onOutsideClick);
  };

  // Temp Revert
  //const handleBlur = e => {
    // if (menuRef.current.contains(e.relatedTarget)) {
    //   return;
    // }

    // onBlurCallback();
  //}

  // tab: to clear all
  const keydownToClear = (e) => {
    const clear = menuRef.current.querySelector('.select-clear');

    if (clear) clear.focus();
    else menuRef.current.querySelector('.select-btn').focus();
  }

  // Accessibility: handle selection and escape
  const handleKeyDown = (e, option) => {
    // tab/escape: close and blur
    if ((e.keyCode === getKeyCode('tab')) || e.keyCode === getKeyCode('escape')) {
      if (onBlur) onBlur();
      closeSelect();
    }
    // arrow down || space from button: open and focus on list
    else if (e.keyCode === getKeyCode('down') || (e.keyCode === getKeyCode('space') && e.target.classList.contains('select-btn'))) {
      e.preventDefault();
      openAndBind(e);
      if (listRef.current) listRef.current.querySelector('.select-option').focus();
    }
    // arrow right: to selected
    else if (e.keyCode === getKeyCode('right')) {
      const displayedOptions = selectedRef.current?.querySelector('.remove-selected');
      if (displayedOptions) displayedOptions.focus();
    }
    // arrow left: to most recent selected
    else if (e.keyCode === getKeyCode('left')) {
      const displayedOptions = Array.from(selectedRef.current?.querySelectorAll('.remove-selected') || []);
      const toIndex = displayedOptions.length - 1 < 0 ? 0 : displayedOptions.length -1;
      if (displayedOptions.length > 0) displayedOptions[toIndex].focus();
    }
    // enter || space: hand click
    else if ((e.keyCode === getKeyCode('enter') || e.keyCode === getKeyCode('space')) && option) {
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
      e.stopPropagation();
      skipTo(e);
    }
  }

  const handleClick = (option) => {
    clickSelect(option);
    
    if (!isMultiSelect) {
      closeAndFocus();
      menuRef.current.querySelector('.select-btn').focus();
      // unbind outside click for single select
      document.removeEventListener('click', onOutsideClick);
    }
  }

  const handleRemove = (e, selection) => {
    removeSelection(e, selection);
    menuRef.current.querySelector('.select-btn').focus();
  }

  // Accessibility: handle traversal and list, toggle between
  //                list and selected
  const traverseSelect = (e) => {
    if (selectedRef.current) traverseNodes(e, selectedRef, '.remove-selected', keydownToClear, true); 
    if (listRef.current) traverseNodes(e, listRef, '.select-option', closeAndFocus)
  }
  
  // Display purposes: Multiselect actionable selected tags
  const selectedTagUI = (index, selection) => (
    <div key={index}
         className="selected">
      <span className={`selected-tag-label ${selection.isFixed ? 'fixed' : ''}`}>
        { !selectRow && getOptionDisplay(selection) }
        {
          selectRow &&
          selectRow(selection)
        }
      </span>
      {
        !selection.isFixed && !disabled &&
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

  const selectedUI = (option) => {
    if (!selectRow) {
      return getOptionDisplay(option);
    }
    else {
      return selectRow(option);
    }
  }

  // Display purposes: Multiselect vs Select
  const labelUI = () => {
    if (!isMultiSelect) {
      return selected 
        ? selectedUI(selected)
        : label
    }
    else {
      return selected.length > 0
      ? 
        (
          <div className="select-display" 
               ref={selectedRef}
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

  // Display purposes: clear all button
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

  // Display purposes: empty row
  const emptySelectUI = () => (
    <li tabIndex={isOpen ? '0' : '-1'} 
        onKeyDown={handleKeyDown}
        aria-label="No available options"
        className="select-option empty">
      No available options.
    </li>
  )

  const rowUI = (option, index) => {
    return (
      <li key={index} 
          tabIndex={isOpen ? '0' : '-1'} 
          className="select-option available"
          onMouseEnter={e => resetFocus(e)}
          onKeyDown={e => handleKeyDown(e, option)} 
          onClick={e => handleClick(option)}
          role="button"
          aria-label={`Select option ${getOptionDisplay(option)}`}>
        { !selectRow && getOptionDisplay(option) }
        { 
          selectRow && 
          selectRow(option)
        }
      </li>
    )
  }

  const groupRowUI = (group, index) => {
    if (!groupedRow) {
      return <label className="group-label" key={index}>{group.label}</label>
    }
    else {
      const filteredGroup = {...group, options: filteredGroupList(group)};
      const customGroupUI = groupedRow(filteredGroup);

      return React.cloneElement(customGroupUI, {
        key: index,
        className: `group-label ${customGroupUI.props.className}`,
        'aria-label': `Grouped Options for ${filteredGroup.label}`
      })
    }
  }

  const listUI = () => {
    if (!isGrouped) {
      const selectList = filteredList();
      
      return (
        <ul className="select-list"
            ref={listRef}
            onKeyDown={e => traverseSelect(e)}>
          {   
            selectList.length > 0 &&
            selectList.map((option, index) => (
              rowUI(option, index)
            ))
          }
          {
            selectList.length <= 0 &&
            emptySelectUI()
          }
        </ul>
      )
    }
    else {
      return (
        <div className="select-list" 
             ref={listRef}>
          {
            options.map((group, i) => {
              const flatGroupOptions = filteredGroupList(group);
              return (
                <React.Fragment key={i}>
                  {groupRowUI(group)}
                  {
                    <ul onKeyDown={e => traverseSelect(e)}>
                      {
                        flatGroupOptions.length > 0 &&
                        flatGroupOptions
                          .map((option, j) => {
                            const groupDetails = Object.assign({}, group);
                            delete groupDetails.options;
                            return rowUI({...option, group: groupDetails}, j);
                          })
                      }
                      {
                      flatGroupOptions.length <= 0 &&
                        emptySelectUI()
                      }
                    </ul>
                  }
                </React.Fragment>
              )
            })
          }
        </div>
      )
    }
  } 

  return (
    <div ref={menuRef}
         className={isMultiSelect ? `multi-select-container ${className} ${selected.length > 0 ? 'show-selected' : ''}`: `select-container ${className}`}>
      <div className={`select-btn${ isOpen ? ' list-open' : ' list-closed' }${ disabled ? ' list-disabled' : ''}`}
           onKeyDown={handleKeyDown}
           //onBlur={e => handleBlur(e)}
           onClick={openAndBind}
           tabIndex="0"
           role="button"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded={isOpen}
           aria-label="Toggle select list">
        <div className="select-label">
          {labelUI()}
          {/* <input className="select-search" onKeyDown={accessKeyDown} onChange={onSearch} type="text" placeholder="Select..."></input> */}
        </div>

        <div className="select-actions">
          {
            isClearable && !isLoading && clearUI()
          }
          {
            isLoading &&
            <React.Fragment>
              <LoadingIcon></LoadingIcon>
              <span></span>
            </React.Fragment>
          }
          <div className="select-chevron">
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </div>
        </div>
      </div>

      { listUI() }
    </div>
  )
};

Select.propTypes = {
  /** Options array: string or object array */
  options: (props, propName, componentName) => {
    if (props['isGrouped']) {
      if (!props['options']?.[0]['options']) {
        return new Error(`Please structure the grouped list to have an array of 'options' to iterate over.`);
      }
    }
  },
  /** Click handler */
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  /** Required for object array of options or grouped options */
  attr: (props, propName, componentName) => {
    if ((props['isGrouped'] && typeof (props['options'][0]['options'][0]) === 'string') && (props[propName] === undefined || typeof(props[propName]) !== 'string')) {
      return new Error(`Please provide a list of objects for a grouped list and a cooresponding attr for display purposes.`)
    }
    else if (props['options']?.[0] instanceof Object && (props[propName] === undefined || typeof(props[propName]) !== 'string')) {
      return new Error(`Please provide an ${propName} for display purposes.`)
    }
  },
  /** Custom list row component */
  selectRow: PropTypes.func,
  /** Custom group UI component */
  groupedRow: PropTypes.func,
  isMultiSelect: PropTypes.bool,
  isGrouped: PropTypes.bool,
  isClearable: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  maxHeight: PropTypes.number
}

Select.defaultProps = {
  label: 'Select...',
  className: '',
  isMultiSelect: false,
  isGrouped: false,
  isClearable: false,
  required: false,
  disabled: false,
  isLoading: false,
  maxHeight: 300
}