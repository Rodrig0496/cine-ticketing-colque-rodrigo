import React, { useState } from 'react';

export default function SeatMatrix() {
  const [seats, setSeats] = useState([
    { id: 1, row: 'A', number: 1, isAvailable: true },
    { id: 2, row: 'A', number: 2, isAvailable: false },
    { id: 3, row: 'A', number: 3, isAvailable: true },
    { id: 4, row: 'B', number: 1, isAvailable: true },
    { id: 5, row: 'B', number: 2, isAvailable: true },
    { id: 6, row: 'B', number: 3, isAvailable: false },
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (!seat.isAvailable) return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handlePurchase = () => {
    alert(`Comprando boletos para los asientos ID: ${selectedSeats.join(', ')}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Selecciona tus asientos</h2>
      
      {/* Representación de la Pantalla del Cine */}
      <div style={{
        width: '250px', 
        height: '30px', 
        backgroundColor: '#dcdde1', 
        borderTopLeftRadius: '50%', 
        borderTopRightRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '5px',
        color: '#7f8fa6',
        fontWeight: 'bold',
        marginBottom: '30px',
        boxShadow: '0 -5px 15px rgba(0,0,0,0.1)'
      }}>
        PANTALLA
      </div>

      {/* Matriz de asientos centrada */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '15px' }}>
        {seats.map(seat => (
          <button
            key={seat.id}
            onClick={() => toggleSeat(seat)}
            disabled={!seat.isAvailable}
            style={{
              height: '60px',
              backgroundColor: !seat.isAvailable ? '#ff4757' : selectedSeats.includes(seat.id) ? '#2ed573' : '#f1f2f6',
              color: !seat.isAvailable ? 'white' : '#2f3542',
              fontWeight: 'bold',
              cursor: !seat.isAvailable ? 'not-allowed' : 'pointer',
              border: selectedSeats.includes(seat.id) ? '2px solid #2ed573' : '1px solid #ced6e0',
              borderRadius: '10px',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {seat.row}-{seat.number}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Asientos seleccionados: {selectedSeats.length}</p>
        <button 
          onClick={handlePurchase} 
          disabled={selectedSeats.length === 0}
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px', 
            cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
            backgroundColor: selectedSeats.length === 0 ? '#dfe4ea' : '#1e90ff',
            color: selectedSeats.length === 0 ? '#a4b0be' : 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: selectedSeats.length === 0 ? 'none' : '0 4px 6px rgba(30, 144, 255, 0.3)'
          }}
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}