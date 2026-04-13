import React, { useState } from "react";
import "./App.css";

function App() {

  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("Enjuague");
  const [hora, setHora] = useState("");
  const [resultado, setResultado] = useState("");

  // Formato AM/PM
  const formatearHora = (hora) => {
    let [h, m] = hora.split(":");
    let fecha = new Date();
    fecha.setHours(h);
    fecha.setMinutes(m);

    return fecha.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Duración
  const obtenerDuracion = (servicio) => {
    if (servicio === "Enjuague") return 1;
    if (servicio.includes("Combo")) return 2;
    if (servicio === "Tapicería") return 3;
    return 1;
  };

  // Calcular entrega
  const calcularEntrega = (horaInicio, servicio) => {
    let duracion = obtenerDuracion(servicio);

    let [h, m] = horaInicio.split(":");
    let fecha = new Date();

    fecha.setHours(parseInt(h));
    fecha.setMinutes(parseInt(m));
    fecha.setHours(fecha.getHours() + duracion);

    return fecha.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const reservar = (e) => {
    e.preventDefault();

    if (!cliente || !hora) {
      alert("Completa todos los campos");
      return;
    }

    const entrega = calcularEntrega(hora, servicio);

    setResultado({
      cliente,
      servicio,
      salida: formatearHora(hora),
      entrega
    });
  };

  return (
    <div className="container">

      <h1>🚗 Autolavado Premium</h1>

      {/* TARJETAS DE SERVICIOS */}
      <div className="cards">
        <div className="card">🧼 Enjuague</div>
        <div className="card">🚿 Lavado General</div>
        <div className="card">🔧 Motor</div>
        <div className="card">✨ Polichado</div>
      </div>

      {/* FORMULARIO */}
      <form onSubmit={reservar} className="formulario">

        <input
          type="text"
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <select value={servicio} onChange={(e) => setServicio(e.target.value)}>
          <option>Enjuague</option>
          <option>Lavado General</option>
          <option>Motor</option>
          <option>Grafito</option>
          <option>Polichado</option>
          <option>Tapicería</option>
          <option>Combo 1</option>
          <option>Combo 2</option>
          <option>Combo Completo</option>
        </select>

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <button type="submit">Reservar</button>
      </form>

      {/* RESULTADO TIPO TICKET */}
      {resultado && (
        <div className="ticket">
          <h2>🎟 Reserva Confirmada</h2>
          <p><strong>Cliente:</strong> {resultado.cliente}</p>
          <p><strong>Servicio:</strong> {resultado.servicio}</p>

          <div className="horas">
            <div>
              <span>🚗 SALIDA</span>
              <h3>{resultado.salida}</h3>
            </div>
            <div>
              <span>🏁 ENTREGA</span>
              <h3>{resultado.entrega}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;