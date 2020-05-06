import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from './Calendar';

import './DatePicker.scss';

const useDatePicker = (props) => {
  const { value, format, placeholder, onClick, disabled } = props;
  const [selectedDate, setSelectedDate] = useState(value ? value : '');
  const [isOpen, setIsOpen] = useState(false);
  const datepickerRef = useRef(null);

  useEffect(() => {
    const hideCalendar = e => {
      if (datepickerRef.current.contains(e.target)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('click', hideCalendar);
    return () =>  {document.removeEventListener('click', hideCalendar) };
  }, [datepickerRef]);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  }

  const setDate = (date) => {
    const formatted = date.format(format);
    setSelectedDate(formatted);
    setIsOpen(false);
    onClick(formatted);
  }

  const clearDate = () => {
    setSelectedDate('');
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

          <button onClick={toggleCalendar} type="button">Close</button>
        </div>
      </div>
    )
  )

  return {
    datepickerRef,
    placeholder,
    disabled,
    selectedDate,
    isOpen,
    toggleCalendar,
    calendar
  }
}

export const DatePicker = memo((props) => {
  const { datepickerRef, 
          placeholder, 
          disabled,
          selectedDate, 
          isOpen, 
          toggleCalendar,
          calendar } = useDatePicker(props);

  return (
    <div className="datepicker-container" ref={datepickerRef}>
      <input className={`form-input ${ isOpen ? 'focused' : ''}`}
             placeholder={placeholder} 
             value={selectedDate}
             readOnly
             disabled={disabled}
             onFocus={toggleCalendar}>
      </input>

      { calendar() }
    </div>
  )
});

DatePicker.propTypes = {
  onClick: PropTypes.func.isRequired,
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