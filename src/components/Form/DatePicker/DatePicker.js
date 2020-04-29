import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Calendar } from './Calendar';

import './DatePicker.scss';

export const DatePicker = (props) => {
  const { date, format, placeholder, onClick } = props;
  const [dateShown, setDateShown] = useState(date ? date : new Date());
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

  const toMonth = (e, increment) => {
    let initialDate = moment(dateShown, format);
    let incrementDate = moment(initialDate)[increment](1, 'M').format(format);

    setDateShown(incrementDate);
  }

  const setDate = (date) => {
    const formatted = date.format(format);
    setSelectedDate(formatted);
    setIsOpen(false);
    onClick(formatted);
  }

  const typeDate = (e) => {
    const inputDate = moment(e.target.value, format);
    //console.log('hello', inputDate.isValid(), inputDate.format(format));
    setSelectedDate(e.target.value);
    if (inputDate.isValid()) {
      setDateShown(inputDate.format(format));
    }
  }

  return (
    <div className="datepicker-container"
         ref={datepickerRef}>
      <input className="form-input"
             placeholder={placeholder} 
             value={selectedDate}
             onChange={typeDate}
             onFocus={(e) => setIsOpen(true)}>
      </input>

      {
        isOpen && (
          <div className="calendar-container">
            <div className="calendar-top">
            
              <button onClick={e => toMonth(e, 'subtract')} className="prev-month">
                <svg viewBox="0 0 20 20" aria-hidden="true" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
              </button>
              <label>{moment(dateShown, format).format('MMMM YYYY')}</label>
              <button onClick={e => toMonth(e, 'add')} className="next-month">
                <svg viewBox="0 0 20 20" aria-hidden="true" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
              </button>
            </div>
            {
              <Calendar date={dateShown} 
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