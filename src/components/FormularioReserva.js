import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { tiemposServicio, calcularHoraEntrega } from '../utils/tiemposServicio';

const FormularioReserva = ({ onReservaCreada }) => {
  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [horaEntrega, setHoraEntrega] = useState('');

  useEffect(() => {
    if (horaInicio && servicio) {
      const entrega = calcularHoraEntrega(horaInicio, servicio);
      setHoraEntrega(entrega);
    }
  }, [horaInicio, servicio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reserva = {
      id: Date.now(),
      cliente,
      servicio,
      horaInicio,
      horaEntrega,
      fecha: new Date().toLocaleDateString()
    };
    onReservaCreada(reserva);
  };

  return (
    <Card className="mb-4">
      <Card.Header>📋 Reservar Lavado</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del cliente</Form.Label>
            <Form.Control 
              type="text" 
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Tipo de lavado</Form.Label>
            <Form.Select value={servicio} onChange={(e) => setServicio(e.target.value)} required>
              <option value="">Seleccione...</option>
              {Object.keys(tiemposServicio).map(s => (
                <option key={s} value={s}>{s} ({tiemposServicio[s]} hora(s))</option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Hora de inicio</Form.Label>
            <Form.Control 
              type="time" 
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
            />
          </Form.Group>
          
          {horaEntrega && (
            <div className="alert alert-info">
              🕒 Hora de entrega: <strong>{horaEntrega}</strong>
            </div>
          )}
          
          <Button variant="primary" type="submit">Reservar</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioReserva;
