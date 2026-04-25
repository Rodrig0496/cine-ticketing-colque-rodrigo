import React, { useState } from 'react';

export default function SeatMatrix() {
  // Simulamos datos que vendrían de tu API (GET /showtimes/{id}/seats)
  const [seats, setSeats] = useState([
    { id: 1, row: 'A', number: 1, isAvailable: true },
    { id: 2, row: 'A', number: 2, isAvailable: false }, // Ocupado
    { id: 3, row: 'A', number: 3, isAvailable: true },
    { id: 4, row: 'B', number: 1, isAvailable: true },
    { id: 5, row: 'B', number: 2, isAvailable: true },
    { id: 6, row: 'B', number: 3, isAvailable: false }, // Ocupado
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (!seat.isAvailable) return; // Si está ocupado, no hace nada

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handlePurchase = () => {
    // Aquí iría el POST /tickets/reservations hacia tu backend
    alert(`Comprando boletos para los asientos ID: ${selectedSeats.join(', ')}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Selecciona tus asientos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '10px' }}>
        {seats.map(seat => (
          <button
            key={seat.id}
            onClick={() => toggleSeat(seat)}
            disabled={!seat.isAvailable}
            style={{
              height: '50px',
              backgroundColor: !seat.isAvailable ? '#ff4d4d' : selectedSeats.includes(seat.id) ? '#4CAF50' : '#ddd',
              cursor: !seat.isAvailable ? 'not-allowed' : 'pointer',
              border: '1px solid #999',
              borderRadius: '5px'
            }}
          >
            {seat.row}-{seat.number}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <p>Asientos seleccionados: {selectedSeats.length}</p>
        <button 
          onClick={handlePurchase} 
          disabled={selectedSeats.length === 0}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}
