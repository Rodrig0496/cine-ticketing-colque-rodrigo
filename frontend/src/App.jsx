import React from 'react';
import SeatMatrix from './components/SeatMatrix';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎬 Cine Ticketing System</h1>
      <p>Cartelera y selección de funciones</p>
      
      {/* Aquí renderizamos nuestra matriz de asientos */}
      <SeatMatrix />
    </div>
  );
}

export default App;
