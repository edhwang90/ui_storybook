import React, { useState, useEffect, useRef } from 'react';

import './Select.scss';

export const Select = (props) => {
  const { label, value, options, attr, onClick, required, errorMessage } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [error, setError] = useState(errorMessage);
  const menuRef = useRef(null);

  useEffect(() => {
    const hideSelect = e => {
      if (menuRef.current.contains(e.target)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('click', hideSelect);
    return () =>  {document.removeEventListener('click', hideSelect) };
  }, [menuRef]);

  useEffect(() => {
    if (selected) setError('');
  }, [selected]);

  const getOptionDisplay = (option) => {
    return attr ? option[attr] : option
  }

  const toggleSelect = () => {
    if (required && !selected) {
      setError('Please select a field.');
    }

    setIsOpen(!isOpen);
  }

  const handleClick = (option) => {
    setSelected(option);
    toggleSelect();
    onClick(option);
  }

  const resetSelect = (e) => {
    e.stopPropagation();
    setSelected('');
    onClick('');
  }

  return (
    <div className="select-container">
      <div className="select-btn-container">
        <div className={`select-btn${ isOpen ? ' list-open' : '' }`}
             onClick={toggleSelect}
             ref={menuRef}>
          {selected ? getOptionDisplay(selected) : label}

          <div className="select-actions">
            {
              !required && selected &&
              <button onClick={resetSelect}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" fill="#4d4d4d"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
              </button>
            }
            <button>
              <svg className="chevron" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" fill="#4d4d4d" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </button>
          </div>
        </div>
      </div>
      {
        isOpen &&
        <ul className="select-list">
        {
          options.map((option, index) => (
            <li key={index}
                onClick={e => handleClick(option)}>{getOptionDisplay(option)}</li>
          ))
        }
        </ul>
      }
      <span className="error-message">{error}</span>
    </div>
  )
}