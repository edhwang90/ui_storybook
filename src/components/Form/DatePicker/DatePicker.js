import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from './Calendar';

import './DatePicker.scss';

export const DatePicker = (props) => {
  const { date, format, placeholder, onClick } = props;
  const [selectedDate, setSelectedDate] = useState(date ? date : '');
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

  const setDate = (date) => {
    const formatted = date.format(format);
    setSelectedDate(formatted);
    setIsOpen(false);
    onClick(formatted);
  };

  return (
    <div className="datepicker-container" ref={datepickerRef}>
      <input className="form-input"
             placeholder={placeholder} 
             value={selectedDate}
             readOnly
             onFocus={(e) => setIsOpen(true)}>
      </input>

      {
        isOpen && (
          <div className="calendar-container">
            {
              <Calendar selectedDate={selectedDate}
                        format={format}
                        onClick={setDate}>
              </Calendar>     
            }
          </div>
        )
      }
    </div>
  )
}

DatePicker.propTypes = {
  date: PropTypes.string,
  format: PropTypes.string
}

DatePicker.defaultProps = {
  format: 'MM/DD/YYYY'
}