import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const Calendar = (props) => {
  const { date, selectedDate, format, onClick } = props;

  const [dateObj, setDateObj] = useState(date);

  const firstDay = () => {
    return moment(dateObj).startOf('month').format('d');
  }

  const daysInMonth = () => {
    return moment(dateObj).daysInMonth();
  }

  const toMonth = (increment) => {
    let initialDate = moment(dateObj);
    let incrementDate = moment(initialDate)[increment](1, 'M').format(format);

    setDateObj(incrementDate);
  }

  const displayHeader = () => {
    return moment.weekdaysShort().map((day, index) => (
      <th key={`wks${index}`}>{day}</th>
    ));
  }

  const displayBody = () => {
    let days = [];
    let rows = [];
    let cells = [];
    //const dateObj = moment(displayDate, format);

    const currentMonth = moment(dateObj).month();
    const currentYear = moment(dateObj).year();

    for (let i = 0; i<firstDay(dateObj); i++) {
      days.push(<td key={`tde${i}`} className="calendar-day empty">{''}</td>)
    };

    for (let j = 1; j <= daysInMonth(dateObj); j++) {
      const newDate = moment().set({'year': currentYear, 'month': currentMonth, date: j})
      const currentDate = moment();
      const highlightToday = newDate.isSame(currentDate, 'day') ? 'today' : '';
      const highlightSelect = newDate.isSame(moment(selectedDate), 'day') ? 'selected' : '';

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
          <svg viewBox="0 0 20 20" aria-hidden="true" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
        <label>{moment(dateObj).format('MMMM YYYY')}</label>
        <button onClick={e => toMonth('add')} className="next-month">
          <svg viewBox="0 0 20 20" aria-hidden="true" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </button>
      </div>

      <table className="month-table">
        <thead>
          <tr>{ displayHeader() }</tr>
        </thead>
        <tbody>
          { displayBody() }
        </tbody>
      </table>
    </React.Fragment>
  )
}

Calendar.defaultProps = {
  date: new Date(),
  format: 'MM/DD/YYYY'
}