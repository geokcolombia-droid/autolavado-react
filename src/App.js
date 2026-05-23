import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormularioReserva from './components/FormularioReserva';

function App() {
  const [reservas, setReservas] = useState([]);
  const [ultimaReserva, setUltimaReserva] = useState(null);

  const handleReservaCreada = (reserva) => {
    setReservas([reserva, ...reservas]);
    setUltimaReserva(reserva);
    alert(`✅ Reserva creada para ${reserva.cliente}`);
  };

  return (
    <Container className="app-container">
      <h1 className="main-title">✨ Autolavado El Brillito ✨</h1>
      
      <Row>
        <Col lg={6} className="mx-auto">
          <FormularioReserva onReservaCreada={handleReservaCreada} />
          
          {ultimaReserva && (
            <Alert variant="success" className="mt-3">
              <strong>🎫 Última reserva:</strong><br />
              Cliente: {ultimaReserva.cliente}<br />
              Servicio: {ultimaReserva.servicio}<br />
              Entrega: {ultimaReserva.horaEntrega}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
