import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Calendar } from './Calendar';

import './DatePicker.scss';

export const DatePicker = (props) => {
  const { date, format, placeholder, onClick } = props;
  const [dateConfig, setDateConfig] = useState(date ? date : new Date());
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
  }, [datepickerRef])

  // const toMonth = (e, increment) => {
  //   let initialDate = moment(dateConfig, format);
  //   let incrementDate = moment(initialDate)[increment](1, 'M').format(format);

  //   setDateConfig(incrementDate);
  // }

  const setDate = (date) => {
    const formatted = date.format(format);
    setSelectedDate(formatted);
    setDateConfig(formatted);
    setIsOpen(false);
    onClick(formatted);
  }

  return (
    <div className="datepicker-container"
         ref={datepickerRef}>
      <input className="form-input"
             placeholder={placeholder} 
             value={selectedDate}
             readonly
             onFocus={(e) => setIsOpen(true)}>
      </input>

      {
        isOpen && (
          <div className="calendar-container">
            {
              <Calendar date={dateConfig}
                        selectedDate={selectedDate}
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