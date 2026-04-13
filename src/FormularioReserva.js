import React, { useState } from "react";

function FormularioReserva() {
  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("Enjuague");
  const [hora, setHora] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    alert(
      "✅ Reserva confirmada\n\n" +
        "Nombre: " + cliente + "\n" +
        "Servicio: " + servicio + "\n" +
        "Hora: " + hora
    );
  };

  return (
    <div>
      <h1>Autolavado</h1>

      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Nombre"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <select
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        >
          <option>Enjuague</option>
          <option>Lavado General</option>
          <option>Lavado de Motor</option>
          <option>Polichado</option>
        </select>

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <button type="submit">Reservar</button>
      </form>
    </div>
  );
}

export default FormularioReserva;