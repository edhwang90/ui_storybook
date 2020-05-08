import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const YearList = (props) => {
  const { currentYear, toYear } = props;

  const liRef = useRef(null);


  useEffect(() => {
    liRef.current.scrollIntoView({block: 'center'});
  }, [liRef])

  const onYearKeyDown = (e, year) => {
    // keys: enter, space
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.stopPropagation();
      toYear(e, year);
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
                      tabIndex="0"
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
    <ol className="year-container">
      {displayYears()}
    </ol>
  )
}

export const Calendar = (props) => {
  const { selectedDate, format, onClick } = props;

  const [dateObj, setDateObj] = useState(selectedDate ? moment(selectedDate, format) : moment());
  const [showYears, setShowYears] = useState(false);

  useEffect(() => {
    setShowYears(false);
  }, [dateObj])

  const firstDay = () => {
    return moment(dateObj, format).startOf('month').format('d');
  }

  const daysInMonth = () => {
    return moment(dateObj, format).daysInMonth();
  }

  const toMonth = (e, increment) => {
    e.stopPropagation();
    let initialDate = moment(dateObj, format);
    let incrementDate = initialDate[increment](1, 'M');

    setDateObj(incrementDate);
  }

  const toYear = (e, year) => {
    e.stopPropagation();
    let initialDate = moment(dateObj, format);
    let newDate = initialDate.set('year', year);

    setDateObj(newDate);
  }

  const toggleYear = (e) => {
    e.stopPropagation();
    setShowYears(!showYears);
  }

  // hack to remove
  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  const onMonthKeyDown = (e, date) => {
    // keys: enter, space
    e.stopPropagation();
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(date);
    }
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

    for (let i = 0; i<firstDay(dateObj); i++) {
      days.push(<td key={`tde${i}`} className="calendar-day empty">{''}</td>)
    }

    for (let j = 1; j <= daysInMonth(dateObj); j++) {
      const newDate = moment().set({'year': currentYear, 'month': currentMonth, date: j});
      const currentDate = moment();
      const highlightToday = newDate.isSame(currentDate, 'day') ? 'today' : '';
      const highlightSelect = newDate.isSame(selectedDate, 'day') ? 'selected' : '';

      days.push(<td tabIndex="0" key={`tdd${j}`} 
                    onKeyDown={(e) => onMonthKeyDown(e, newDate.format(format))}
                    onClick={(e) => onClick(newDate.format(format))} 
                    className={`calendar-day ${highlightToday} ${highlightSelect}`}
                    aria-label="Select day">
                    {j}
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
        <button tabIndex="0"
                onKeyDown={stopPropagation}
                onClick={e => toMonth(e, 'subtract')} 
                className="btn is-clear prev-month" 
                type="button"
                aria-label="To previous month">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
        <div>
          <label>{moment(dateObj).format('MMMM')}</label>
          <button tabIndex="0"
                  className="btn is-clear"
                  onKeyDown={stopPropagation}
                  onClick={toggleYear} 
                  type="button"
                  aria-label="Select year">{moment(dateObj).format('YYYY')}</button>
        </div>
        <button tabIndex="0"
                onKeyDown={stopPropagation}
                onClick={e => toMonth(e, 'add')} 
                className="btn is-clear next-month" 
                type="button"
                aria-label="To next month">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
      </div>

      {
        showYears && <YearList toYear={toYear} currentYear={moment(dateObj, format).year()}></YearList>
      }

      {
        !showYears &&
        <React.Fragment>
          <table className="month-table">
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
  selectedDate: PropTypes.string,
  format: PropTypes.string
}

Calendar.defaultProps = {
  format: 'MM/DD/YYYY'
}