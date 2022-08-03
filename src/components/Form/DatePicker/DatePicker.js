import React, { useState, useRef, memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from './Calendar';
import moment from 'moment';
import { traverseTable, getKeyCode } from '../../../Utils';

import './DatePicker.scss';

export const useDatePicker = (props) => {
  const { value, onClick, onBlur, format } = props;
  const [selectedDate, setSelectedDate] = useState(value ? moment(value, format) : '');
  const [displayDate, setDisplayDate] = useState(value ? moment(value, format).format(format) : '');
  const [isOpen, setIsOpen] = useState(false);

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
  }, [isOpen, initialMount, onBlurCallback])

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  }

  const openCalendar = () => {
    setIsOpen(true);
  }

  const closeCalendar = () => {
    setIsOpen(false);
  }

  const isDate = (value) => {
    return moment(value, format, true).isValid();
  }

  const setDate = (date) => {
    setSelectedDate(moment(date, format));
    setDisplayDate(moment(date, format).format(format));
    setIsOpen(false);
    onClick(date);
  }

  const setDisplay = (value) => {
    setDisplayDate(value);

    if (isDate(value)) {
      setDate(value);
    }
    else {
      setSelectedDate('');
      onClick('');
    }
  }

  const clearDate = () => {
    setSelectedDate('');
    setDisplayDate('');
    onClick('');
  }

  return {
    selectedDate,
    displayDate,
    isOpen,
    toggleCalendar,
    closeCalendar,
    clearDate,
    setDate,
    setDisplay
  }
}

export const DatePicker = (props) => {
  const { selectedDate, 
          displayDate,
          isOpen,
          toggleCalendar,
          closeCalendar,
          clearDate,
          setDate,
          setDisplay } = useDatePicker(props);

  const { className, placeholder, format, disabled, onBlur } = props;

  const datepickerRef = useRef(null);
  const calendarRef = useRef(null);

  const onOutsideClick = e => {
    const path = e.path || e.composedPath();
    if (path.indexOf(datepickerRef.current) >= 0) {
      return;
    }

    closeCalendar();
    document.removeEventListener('click', onOutsideClick);
  };

  const toggle = () => {
    if (disabled) return;
    toggleCalendar();
    document.addEventListener('click', onOutsideClick);
  }

  // Accessibility: key downs: escape (close), enter/space (open)
  const handleKeyDown = (e) => {
    // arrow down: open
    if (e.keyCode === getKeyCode('down') && e.target.classList.contains('form-input')) {
      toggle(true);
      document.addEventListener('click', onOutsideClick);
    }
    // key: shift + tab || esc
    else if ((e.keyCode === getKeyCode('tab') && e.shiftKey) || e.keyCode === getKeyCode('escape')) {
      closeCalendar();
    }
    else {
      setDisplay(e.target.value);
    }
  }

  // Accessibility close on blur
  const handleExitBlur = (e) => {
    if (e.keyCode === getKeyCode('tab')) {
      e.preventDefault();
      // loop focus back to calendar top actions
      datepickerRef.current.querySelector('.prev-month').focus();
    }
    else if (e.keyCode === getKeyCode('space')) {
      e.preventDefault();
      closeCalendar();
    }
  }

  const calendar = () => (
    isOpen && (
      <div className="calendar-container"
           ref={calendarRef}
           onKeyDown={e => traverseTable(e, calendarRef)}>
        {
          <Calendar selectedDate={selectedDate}
                    format={format}
                    closeCalendar={closeCalendar}
                    onClick={setDate}>
          </Calendar>     
        }
        <div className="calendar-bottom">
          <button className="btn is-clear" 
                  onClick={clearDate} 
                  type="button">Clear</button>

          <button className="btn is-clear" 
                  onClick={closeCalendar} 
                  onKeyDown={e => handleExitBlur(e)} 
                  type="button">Close</button>
        </div>
      </div>
    )
  )

  return (
    <div className="datepicker-container" 
         ref={datepickerRef}>
      <div className="input-container">
        <input className={`form-input ${className} ${isOpen ? 'calendar-open' : ''}`}
              placeholder={placeholder} 
              value={displayDate}
              onBlur={onBlur}
              disabled={disabled}
              onChange={handleKeyDown}
              onKeyDown={handleKeyDown}>
        </input>
        <button aria-label="Open datepicker"
                data-toggle="datepicker"
                aria-haspopup="true"
                onClick={toggle} 
                disabled={disabled} 
                type="button" 
                className="btn is-alternate form-input-append select-chevron">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
      </div>
      { calendar() }
    </div>
  )
};

DatePicker.propTypes = {
  /** Click handler */
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  /** Format, can be any supported by Moment.js (i.e., DD/MM/YYYY) */
  format: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

DatePicker.defaultProps = {
  format: 'MM/DD/YYYY',
  placeholder: 'MM/DD/YYYY',
  disabled: false,
  className: '',
}