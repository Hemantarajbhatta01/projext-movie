import React, { useState } from 'react';
import './DateSelector.css';

const dates = [
  { day: 'Mon', date: '18' },
  { day: 'Tue', date: '19' },
  { day: 'Wed', date: '20' },
  { day: 'Thu', date: '21' },
  { day: 'Fri', date: '22' },
  { day: 'Sat', date: '23' },
  { day: 'Sun', date: '24' },
];

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState('18');

  return (
    <div className="date-selector-container">
      <div className="calendar-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      </div>
      
      <div className="dates-row">
        {dates.map((d) => (
          <div 
            key={d.date} 
            className={`date-item ${selectedDate === d.date ? 'active' : ''}`}
            onClick={() => setSelectedDate(d.date)}
          >
            <span className="day">{d.day}</span>
            <span className="date">{d.date}</span>
          </div>
        ))}
      </div>

      <div className="date-nav-btns">
        <button className="nav-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
        <button className="nav-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
      </div>
    </div>
  );
};

export default DateSelector;
