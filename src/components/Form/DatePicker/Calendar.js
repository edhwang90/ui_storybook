import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { traverseNodes, getKeyCode } from '../../../Utils';

const YearList = (props) => {
  const { currentYear, toYear, toggleYear } = props;

  const liRef = useRef(null);
  const yearsRef = useRef(null);

  useEffect(() => {
    if (liRef.current) liRef.current.scrollIntoView({block: 'center'});
    if (liRef.current) liRef.current.focus();
  }, [liRef])

  // Accessibility: key downs to year, escape year picker
  const onYearKeyDown = (e, year) => {
    // keys: enter, space
    if (e.keyCode === getKeyCode('enter') || e.keyCode === getKeyCode('space')) {
      toYear(e, year);
    }
    // key: escape
    else if (e.keyCode === getKeyCode('escape')) {
      toggleYear();
    }
  }

  const displayYears = () => {
    let years = [];

    for (let i = 1900; i <= currentYear+100; i++) {
      let isCurrent;
      let scrollRef;
      if (i === currentYear) {
        isCurrent = 'this-year';
        scrollRef = liRef;
      }
      
      const row = <li ref={scrollRef} 
                      tabIndex={currentYear === i ? 0 : "-1"}
                      className={isCurrent} 
                      onKeyDown={e => onYearKeyDown(e, i)}
                      onClick={e => toYear(e, i)} 
                      key={`dyr${i}`}
                      aria-label="Select year">{i}</li>;
      years.push(row);
    }

    return years;
  }


  return (
    <ol className="year-container"
        ref={yearsRef}
        tabIndex="-1"
        onKeyDown={e => traverseNodes(e, yearsRef, 'li')} >
      {displayYears()}
    </ol>
  )
}

export const Calendar = (props) => {
  const { selectedDate, format, onClick, closeCalendar } = props;

  const [dateObj, setDateObj] = useState(selectedDate ? moment(selectedDate, format) : moment());
  const [showYears, setShowYears] = useState(false);

  const focusRef = useRef(null);

  useEffect(() => {
    setShowYears(false);
  }, [dateObj, setShowYears])

  useEffect(() => {
    if (focusRef.current) focusRef.current.focus();
  }, [showYears, focusRef.current])

  const firstDay = () => {
    return moment(dateObj, format).startOf('month').format('d');
  }

  const daysInMonth = () => {
    return moment(dateObj, format).daysInMonth();
  }

  const toMonth = (e, increment) => {
    let initialDate = moment(dateObj, format);
    let incrementDate = initialDate[increment](1, 'M');

    setDateObj(incrementDate);
  }

  const toYear = (e, year) => {
    let initialDate = moment(dateObj, format);
    let newDate = initialDate.set('year', year);

    setDateObj(newDate);
  }

  const toggleYear = (e) => {
    setShowYears(!showYears);
  }

  // Accessibility: key down handle selection
  const onMonthKeyDown = (e, date) => {
    // enter || space: register click
    if (e.keyCode === getKeyCode('enter') || e.keyCode === getKeyCode('space')) {
      onClick(date);
    }
    // escape: close calendar
    else if (e.keyCode === getKeyCode('escape')) {
      closeCalendar();
    }
  }

  // Accessibility: reset focus
  const resetFocus = (e) => {
    e.target.focus();
  }

  const displayHeader = () => (
    moment.weekdaysShort().map((day, index) => (
      <th key={`wks${index}`}>{day}</th>
    ))
  )
  
  const displayBody = () => {
    let days = [];
    let rows = [];
    let cells = [];
    
    const currentMonth = moment(dateObj, format).month();
    const currentYear = moment(dateObj, format).year();
    let hasStartingRef = false;

    for (let i = 0; i<firstDay(dateObj); i++) {
      days.push(<td aria-hidden="true" key={`tde${i}`} className="empty">{''}</td>)
    }

    for (let j = 1; j <= daysInMonth(dateObj); j++) {
      const newDate = moment().set({'year': currentYear, 'month': currentMonth, date: j});
      const currentDate = moment();
      const highlightToday = newDate.isSame(currentDate, 'day') ? 'today' : '';
      const highlightSelect = newDate.isSame(selectedDate, 'day') ? 'selected' : '';

      let startingRef = null;
      // if selected day visible override
      if (newDate.isSame(selectedDate, 'day')) {
        startingRef = focusRef;
        hasStartingRef = true;
      }
      // if current day visible and no selected
      else if (newDate.isSame(currentDate, 'day') && !hasStartingRef) {
        startingRef = focusRef;
      }
      // default first day and no current or selected
      else if (j=== 1 && !hasStartingRef) {
        startingRef = focusRef
      }

      days.push(<td tabIndex={ newDate.isSame(currentDate, 'day') ? "0" : "-1" }
                    key={`tdd${j}`} 
                    ref={startingRef}
                    onMouseEnter={e => resetFocus(e) }
                    onKeyDown={(e) => onMonthKeyDown(e, newDate.format(format))}
                    onClick={(e) => onClick(newDate.format(format))} 
                    className={`calendar-day ${highlightToday} ${highlightSelect}`}>
                    <span role="button"
                          aria-label={`Select the date: ${moment(dateObj).set('date', j).format('MMMM DD YYYY')}`}>
                      {j}
                    </span>
                </td>)
    }

    days.forEach((row, k) => {
      if (k%7 !== 0) {
        cells.push(row);
      }
      else {
        rows.push(cells);
        cells = [];
        cells.push(row)
      }
      if (k === days.length - 1) {
        rows.push(cells);
      }
    });

    let monthBody = rows.map((cell, index) => (
      <tr key={`mtb${index}`}>{cell}</tr>
    ));

    return monthBody;
  }

  return (
    <React.Fragment>
      <div className="calendar-top">
        <button onClick={e => toMonth(e, 'subtract')} 
                className="btn is-clear prev-month" 
                type="button"
                aria-label={`To previous month (${moment(dateObj).subtract(1, 'M').format('MMMM')})`}>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
        <div>
          <label>{moment(dateObj).format('MMMM')}</label>
          <button className="btn is-clear"
                  onClick={toggleYear} 
                  type="button"
                  aria-label="Select year">{moment(dateObj).format('YYYY')}</button>
        </div>
        <button onClick={e => toMonth(e, 'add')} 
                className="btn is-clear next-month" 
                type="button"
                aria-label={`To next month (${moment(dateObj).add(1, 'M').format('MMMM')})`}>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
      </div>

      {
        showYears && <YearList toggleYear={toggleYear} toYear={toYear} currentYear={moment(dateObj, format).year()}></YearList>
      }

      {
        !showYears &&
        <React.Fragment>
          <table aria-label={`Month of ${moment(dateObj).format('MMMM')}`}
                 className="month-table">
            <thead>
              <tr>{ displayHeader() }</tr>
            </thead>
            <tbody>
              { displayBody() }
            </tbody>
          </table>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

Calendar.propTypes = {
  onClick: PropTypes.func.isRequired,
  closeCalendar: PropTypes.func.isRequired,
  selectedDate: PropTypes.any,
  format: PropTypes.string
}

Calendar.defaultProps = {
  format: 'MM/DD/YYYY'
}