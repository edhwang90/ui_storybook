import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from './Calendar';

import './DatePicker.scss';

export const useDatePicker = (props) => {
  const { className, format, value, placeholder, onClick, disabled } = props;
  const [selectedDate, setSelectedDate] = useState(value ? value : '');
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  }

  const closeCalendar = () => {
    setIsOpen(false);
  }

  const setDate = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
    onClick(date);
  }

  const clearDate = () => {
    setSelectedDate('');
    onClick('');
  }

  return {
    className,
    placeholder,
    format,
    disabled,
    selectedDate,
    isOpen,
    toggleCalendar,
    closeCalendar,
    clearDate,
    setDate
  }
}

export const DatePicker = memo((props) => {
  const { className,
          placeholder, 
          disabled,
          format,
          selectedDate, 
          isOpen, 
          toggleCalendar,
          closeCalendar,
          clearDate,
          setDate } = useDatePicker(props);

  const datepickerRef = useRef(null);

  const onOutsideClick = e => {
    if (datepickerRef.current.contains(e.target)) {
      return;
    }

    closeCalendar();
    document.removeEventListener('click', onOutsideClick);
  };

  const toggle = () => {
    toggleCalendar();
    document.addEventListener('click', onOutsideClick);
  }

  // Accessibility: key downs: escape (close), enter/space (open)
  const handleKeyDown = (e) => {
    // key: enter, space
    if (e.keyCode === 13 || e.keyCode === 32) {
      toggleCalendar();
    }
    // key: shift + tab || esc
    else if (e.keyCode === 9 && e.shiftKey || e.keyCode === 27) {
      closeCalendar();
    }
  }

  // Accessibility close on blur
  const handleExitBlur = (e) => {
    if (e.keyCode === 9 && !e.shiftKey) {
      e.preventDefault();
      // loop focus back to calendar top actions
      datepickerRef.current.querySelector('.prev-month').focus();
    }
  }

  const calendar = () => (
    isOpen && (
      <div className="calendar-container">
        {
          <Calendar selectedDate={selectedDate}
                    format={format}
                    onClick={setDate}>
          </Calendar>     
        }
        <div className="calendar-bottom">
          <button className="btn is-clear" 
                  onClick={clearDate} 
                  type="button">Clear</button>

          <button className="btn is-clear" 
                  onClick={toggle} 
                  onKeyDown={e => handleExitBlur(e)} 
                  type="button">Close</button>
        </div>
      </div>
    )
  )

  return (
    <div className="datepicker-container" 
         ref={datepickerRef}>
      <input className={`form-input ${className} ${isOpen ? 'calendar-open' : ''}`}
             placeholder={placeholder} 
             value={selectedDate}
             readOnly
             disabled={disabled}
             onKeyDown={handleKeyDown}
             onClick={toggle}>
      </input>

      { calendar() }
    </div>
  )
});

DatePicker.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

DatePicker.defaultProps = {
  format: 'MM/DD/YYYY',
  placeholder: 'MM/DD/YYYY',
  disabled: false
}