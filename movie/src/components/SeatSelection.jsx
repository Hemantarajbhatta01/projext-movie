import React, { useState } from 'react';
import './SeatSelection.css';

const rows = ['G', 'F', 'E', 'D', 'C', 'B', 'A'];
const cols = Array.from({ length: 16 }, (_, i) => i + 1);

// Some mock booked seats
const bookedSeats = ['G5', 'F12', 'E3', 'E4', 'C8', 'C9', 'A15'];
// Initially selected seats based on the image
const initialSelected = ['B8', 'B9', 'B10'];

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState(initialSelected);

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="seat-selection-panel">
      <div className="screen-container">
        <div className="screen-curve"></div>
        <div className="screen-glow"></div>
        <div className="screen-text">S C R E E N</div>
      </div>
      
      <div className="seats-container">
        {rows.map(row => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            <div className="seat-grid">
              {cols.map(col => {
                const seatId = `${row}${col}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                
                let seatClass = 'seat available';
                if (isBooked) seatClass = 'seat booked';
                if (isSelected) seatClass = 'seat selected';

                return (
                  <button 
                    key={seatId}
                    className={seatClass}
                    onClick={() => toggleSeat(seatId)}
                    disabled={isBooked}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
            <span className="row-label right">{row}</span>
          </div>
        ))}
      </div>
      
      <div className="legend-container">
        <div className="legend-item">
          <div className="seat-preview selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat-preview available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat-preview booked"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
