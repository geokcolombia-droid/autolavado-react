export const tiemposServicio = {
  'Enjuague': 1,
  'Lavado General': 2,
  'Lavado de Motor': 2,
  'Grafico': 2,
  'Polichado': 3,
  'Lavado de Tapicería': 3,
  'Combo: Lavado General + Motor': 2,
  'Combo: Lavado General + Motor + Grafico': 3,
  'Combo: Lavado General + Motor + Grafico + Polichado': 4,
  'Combo: Lavado Completo': 4
};

export function calcularHoraEntrega(horaInicio, servicio) {
  if (!horaInicio || !servicio) return '';
  
  const [horas, minutos] = horaInicio.split(':').map(Number);
  const duracion = tiemposServicio[servicio] || 1;
  
  let nuevaHora = horas + duracion;
  
  if (nuevaHora >= 24) {
    nuevaHora = nuevaHora - 24;
  }
  
  return `${nuevaHora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}