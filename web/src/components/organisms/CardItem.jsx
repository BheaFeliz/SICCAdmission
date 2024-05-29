import React from 'react';

const CardItem = ({ title, description, date, startTime, endTime, onDateSelect }) => (
  <div className="card">
    <h2 className="card-title">{title}</h2>
    <p className="card-description">{description}</p>
    {date && startTime && endTime && (
      <div className="card-schedule">
        <p>Date: {date}</p>
        <p>Time: {startTime} - {endTime}</p>
      </div>
    )}
    <button onClick={() => onDateSelect(new Date())}>Select Date</button>
  </div>
);

export default CardItem;