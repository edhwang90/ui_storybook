import React, { useState, useRef, memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { traverseNodes } from '../../Utils';

import './Select.scss';

export const useSelect = (props) => {
  const { options, value, attr, onClick, onBlur, isMultiSelect, isGrouped, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(isMultiSelect ? value ? value : [] : value);

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
    return options.filter(option => !selections?.find(filter => getOptionDisplay(option) === getOptionDisplay(filter)));
  }

  const filteredGroupList = () => {
    const selections = isMultiSelect ? selected : [selected];
    
    for (let option of options) {
      for (let select of selections) {
        if (option.label === select.label) {
          option.options = option.options.filter(filter => !select.options.find(find => getOptionDisplay(filter) === getOptionDisplay(find) ))
        }
      }
    }
    return options;
  }

  const isResetAvailable = () => {
    if (!isGrouped) {
      return selected.length > 0;
    }
    else {
      for (let option of selected) { 
        return option.options?.some(filter => !filter.isFixed);
      }
      return false; 
    }
  }

  const closeSelect = () => {
    setIsOpen(false);
  }

  const openSelect = () => {
    setIsOpen(true);
  }

  const updateGroup = (index, groupToUpdate) => {
    if (groupToUpdate.options.length > 0 ) {
      setSelected([
        ...selected.slice(0, index), 
        groupToUpdate,
        ...selected.slice(index+1)
      ]);
      onClick([
        ...selected.slice(0, index), 
        groupToUpdate,
        ...selected.slice(index+1)
      ]);
    }
    else {
      setSelected([
        ...selected.slice(0, index),
        ...selected.slice(index+1)
      ]);
      onClick([
        ...selected.slice(0, index),
        ...selected.slice(index+1)
      ]);
    }
  }

  const handleClick = (option, group) => {
    if (!group) {
      if (isMultiSelect) {
        setSelected([...selected, option]);
        onClick([...selected, option]);
      }
      else {
        setSelected(option);
        onClick(option);
        closeSelect();
      }
    }
    else {
      if (isMultiSelect) {
        const indexOfUpdate = selected.findIndex(find => find.label === group.label);
        if (indexOfUpdate >= 0) {
          const groupToUpdate = selected[indexOfUpdate];
          groupToUpdate.options = [...groupToUpdate.options, option] 
          updateGroup(indexOfUpdate, groupToUpdate);
        }
        else {
          const selection = { ...group, options: [option]};
          setSelected([...selected, selection]);
          onClick([...selected, selection]);
        }

      }
      else {
        const selection = { ...group, options: [option]};
        setSelected(selection);
        onClick(selection);
        closeSelect();
      }
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

    let updated = selected;
    if (!isGrouped) {
      updated = updated.filter(find => find.isFixed);
      setSelected(updated);
      onClick(updated);
    }
    else {
      let indexOfUpdate;
      for (let option of selected) {
        for (let groupedOption of option.options) {
          if (!groupedOption.isFixed) {
            indexOfUpdate = updated.findIndex(find => find.label === option.label);
            updated[indexOfUpdate].options = updated[indexOfUpdate].options.filter(find => getOptionDisplay(find) !== getOptionDisplay(groupedOption));
          }
        } 
      }
      updateGroup(indexOfUpdate, updated[indexOfUpdate]);
    }
  }

  const removeSelection = (e, toRemove, group) => {
    e.stopPropagation();
    if (disabled) return;
    
    if (!group) {
      const updated = selected.filter(find => getOptionDisplay(find) !== getOptionDisplay(toRemove));

      setSelected(updated);
      onClick(updated);
    }
    else {
      const indexOfUpdate = selected.findIndex(find => find.label === group.label);
      const groupToUpdate = selected[indexOfUpdate];
      groupToUpdate.options = groupToUpdate.options.filter(find => getOptionDisplay(find) !== getOptionDisplay(toRemove));
  
      updateGroup(indexOfUpdate, groupToUpdate);
    }
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
    handleClick,
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
          handleClick,
          removeSelection  } = useSelect(props);
  
  const { disabled, isMultiSelect, isGrouped, onBlur,
          className, label, selectRow, groupedRow } = props;

  const menuRef = useRef(null);
  const listRef = useRef(null); // for Accessible traversing
  const selectedRef = useRef(null); // for Accessible traversing

  const closeAndBlur = () => {
    closeSelect();
    menuRef.current.querySelector('.select-btn').blur();
  }

  const onOutsideClick = e => {
    if (e.path.indexOf(menuRef.current) >= 0) {
      return;
    }

    closeAndBlur();
    
    // unbind
    document.removeEventListener('click', onOutsideClick);
  };

  const accessKeyDown = (e) => {
    if ((e.keyCode === 9 && e.shiftKey) || e.keyCode === 27 || (e.keyCode === 9 && !isOpen)) {
      closeAndBlur();
    }
    else if (e.keyCode === 13 || e.keyCode === 32) {
      accessOpen(e);
    }
    else if (e.keyCode === 40 && isOpen) {
      e.preventDefault();
      listRef.current.querySelector('li').focus();
    }
    else if (e.keyCode === 39) {
      const displayedOptions = selectedRef.current.querySelector('.remove-selected');
      if (displayedOptions) displayedOptions.focus();
    }
  }

  const keydownToClear = () => {
    const clear = selectedRef.current.querySelector('.select-clear');
    if (clear) clear.focus();
  }

  const accessOpen = (evt) => {
    if (disabled) return;
    if (!evt) return;
    openSelect();
    document.addEventListener('click', onOutsideClick);
  }

  // Accessibility: handle selection and escape
  const handleKeyDown = (e, option, group) => {
    // key: enter, space
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      handleClick(option, group);
    }
    // key: escape
    else if (e.keyCode === 27) {
      closeAndBlur();
    }
  }
  
  const selectedTagUI = (index, selection, group) => (
    <div key={index} 
        //  onKeyDown= {e => traverseNodes(e, selectedRef, '.remove-selected', keydownToClear, true)}
         className="selected">
      <span className={selection.isFixed ? 'fixed' : ''}>{getOptionDisplay(selection)}</span>
      {
        !selection.isFixed &&
        <button className="btn remove-selected"
                id={index}
                disabled={disabled}
                onClick={(e) => removeSelection(e, selection, group)}
                type="button"
                aria-label="Remove selection">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
        </button>
      }
    </div>
  )

  // Display purposes: Multiselect vs Select
  const labelUI = () => {
    if (!isGrouped) {
      if (!isMultiSelect) {
        return selected 
          ? getOptionDisplay(selected)
          : label
      }
      else {
        return selected.length > 0
        ? 
          (
            selected.map((selection, k) => (
              selectedTagUI(k, selection)
            ))
          )
        : <span className="not-selected">{label}</span>
      }
    }
    else {
      if (!isMultiSelect) {
        return selected ? getOptionDisplay(selected.options[0]) : label;
      }
      else {
        return selected.length > 0
          ? 
            (
              selected.map((group, k) => (
                group.options.map((selection, l) => (
                  selectedTagUI(l, selection, group)
                ))
              ))
            )
          : <span className="not-selected">{label}</span>
      }
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
    <ul className="select-list"><li>No available options.</li></ul>
  )

  const rowUI = (option, index, group) => {
    if (!selectRow) {
      return (
        <li key={index} 
            tabIndex="0"
            onKeyDown={e => handleKeyDown(e, option, group)} 
            onClick={e => handleClick(option, group)}
            aria-label={`Select option ${getOptionDisplay(option)}`}>
          {getOptionDisplay(option)}
        </li>
      )
    }
    else {
      return React.cloneElement(selectRow(getOptionDisplay(option)), {
        tabIndex: "0",
        key: index,
        onKeyDown: e => handleKeyDown(e, option, group),
        onClick: e => handleClick(option, group),
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
    if (isOpen && filteredList().length <= 0) {
      return emptySelect()
    }
    else if (isOpen && !isGrouped) {
      
      return (
        <ul tabIndex="-1" 
            className="select-list" 
            ref={listRef} 
            onKeyDown={e => traverseNodes(e, listRef, 'li', closeAndBlur)}>
          {
            filteredList().map((option, index) => (
              rowUI(option, index)
            ))
          }
        </ul>
      )
    }
    else if (isOpen && isGrouped) {
      return (
        <div tabIndex="-1" 
            className="select-list" 
            ref={listRef}>
          {
            filteredGroupList().map((group, i) => (
              <React.Fragment key={i}>
                {groupRowUI(group)}
                {
                  <ul onKeyDown={e => traverseNodes(e, listRef, 'li', closeAndBlur)}>
                    {
                      group.options.map((option, j) => {
                        const groupDetails = Object.assign({}, group);
                        delete groupDetails.options;
                        return rowUI(option, j, groupDetails);
                      })
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
           onKeyDown={accessKeyDown}
           onClick={accessOpen}
           onBlur={onBlur}
           tabIndex="0"
           aria-label="Toggle select list">
        <div tabIndex="-1" 
             className="select-display"
             ref={selectedRef}
             onKeyDown={e => traverseNodes(e, selectedRef, 'button', keydownToClear, true)}>
          {labelUI()}
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