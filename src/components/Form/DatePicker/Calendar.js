import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

const YearList = (props) => {
  const { currentYear, toYear } = props;

  const olRef = useRef(null);
  const liRef = useRef(null);
  let years = [];

  useEffect(() => {
    liRef.current.scrollIntoView({block: 'center'});
  }, [liRef])

  for (let i = 1900; i <= currentYear+100; i++) {
    let isCurrent;
    let scrollRef;
    if (i === currentYear) {
      isCurrent = 'this-year';
      scrollRef = liRef;
    }
    
    const row = <li ref={scrollRef} className={isCurrent} onClick={e => toYear(e, i)} key={`dyr${i}`}>{i}</li>;
    years.push(row);
  }

  return (
    <ol ref={olRef} className="year-container">
      {years}
    </ol>
  );
}

export const Calendar = (props) => {
  const { selectedDate, format, onClick } = props;

  const [dateObj, setDateObj] = useState(selectedDate ? moment(selectedDate, format) : moment());
  const [selected] = useState(selectedDate ? moment(selectedDate, format) : moment());
  const [showYears, setShowYears] = useState(false);

  useEffect(() => {
    setShowYears(false);
  }, [dateObj]);

  const firstDay = () => {
    return moment(dateObj, format).startOf('month').format('d');
  }

  const daysInMonth = () => {
    return moment(dateObj, format).daysInMonth();
  }

  const toMonth = (increment) => {
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

  const toggleYear = () => {
    setShowYears(!showYears);
  }

  const displayHeader = (
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
    };

    for (let j = 1; j <= daysInMonth(dateObj); j++) {
      const newDate = moment().set({'year': currentYear, 'month': currentMonth, date: j});
      const currentDate = moment();
      const highlightToday = newDate.isSame(currentDate, 'day') ? 'today' : '';
      const highlightSelect = newDate.isSame(selected, 'day') ? 'selected' : '';

      days.push(<td key={`tdd${j}`} 
                    onClick={(e) => onClick(newDate)} 
                    className={`calendar-day ${highlightToday} ${highlightSelect}`}>
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
    })

    let monthBody = rows.map((cell, index) => (
      <tr key={`mtb${index}`}>{cell}</tr>
    ));

    return monthBody;
  }

  return (
    <React.Fragment>
      <div className="calendar-top">
        <button onClick={e => toMonth('subtract')} className="prev-month">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
        <div>
          <label>{moment(dateObj).format('MMMM')}</label>
          <button onClick={toggleYear}>{moment(dateObj).format('YYYY')}</button>
        </div>
        <button onClick={e => toMonth('add')} className="next-month">
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
              <tr>{ displayHeader }</tr>
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

Calendar.defaultProps = {
  format: 'MM/DD/YYYY'
}