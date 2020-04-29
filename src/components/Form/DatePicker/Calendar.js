import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const Calendar = (props) => {
  const { date, format, onClick } = props;

  const firstDay = (dateObj) => {
    return dateObj.startOf('month').format('d');
  }

  const daysInMonth = (dateObj) => {
    return dateObj.daysInMonth();
  }

  const displayHeader = () => {
    return moment.weekdaysShort().map((day, index) => (
      <th key={`wks${index}`}>{day}</th>
    ));
  }

  const displayBody = (displayDate) => {
    let days = [];
    let rows = [];
    let cells = [];
    const dateObj = moment(displayDate, format);
    const currentMonth = dateObj.month();
    const currentYear = dateObj.year();

    for (let i = 0; i<firstDay(dateObj); i++) {
      days.push(<td key={`tde${i}`} className="calendar-day empty">{''}</td>)
    };

    for (let j = 1; j <= daysInMonth(dateObj); j++) {
      const newDate = moment().set({'year': currentYear, 'month': currentMonth, date: j})
      days.push(<td key={`tdd${j}`} onClick={(e) => onClick(newDate)} className="calendar-day">{j}</td>)
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
    <table className="month-table">
      <thead>
        <tr>{ displayHeader() }</tr>
      </thead>
      <tbody>
        { displayBody(date) }
      </tbody>
    </table>
  )
}

Calendar.defaultProps = {
  date: new Date(),
  format: 'MM/DD/YYYY'
}