import React, { useState, useEffect, useRef, memo } from 'react';
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

  const handleKeyDown = (e) => {
    console.log('asdf');
    // key: escape
    if (e.keyCode === 27) {
      closeCalendar();
    }
    // key: enter, space
    else if (e.keyCode === 13 || e.keyCode === 32) {
      toggleCalendar();
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
          <button onClick={clearDate} type="button">Clear</button>

          <button onClick={toggle} type="button">Close</button>
        </div>
      </div>
    )
  )

  return (
    <div onKeyDown={handleKeyDown} className="datepicker-container" ref={datepickerRef}>
      <input className={`form-input ${className}`}
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