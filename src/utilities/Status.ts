type StatusT = {
  key: string;
  value: string;
};

export const Status: StatusT[] = [
  // Estados generales para estudiantes
  {
    key: "001",
    value: "Activo", // El estudiante está inscrito y participando activamente en el sistema.
  },
  {
    key: "002",
    value: "Inactivo", // El estudiante está inscrito pero no está participando actualmente.
  },
  {
    key: "003",
    value: "Suspendido", // El estudiante ha sido temporalmente suspendido por alguna razón administrativa o disciplinaria.
  },
  {
    key: "004",
    value: "Graduado", // El estudiante ha completado todos los requisitos y ha terminado el programa o curso.
  },
  {
    key: "005",
    value: "Pendiente", // El estudiante está en espera de ser admitido o de completar el proceso de inscripción.
  },
  {
    key: "006",
    value: "Reprobado", // El estudiante ha fallado en completar los requisitos necesarios y no ha aprobado el curso o nivel.
  },
  {
    key: "007",
    value: "Retirado", // El estudiante ha decidido dejar el programa o curso antes de completarlo.
  },
  {
    key: "008",
    value: "En Progreso", // El estudiante está actualmente participando en el curso o nivel y avanzando en el programa.
  },
  {
    key: "009",
    value: "Licencia Temporal", // El estudiante ha tomado un descanso temporal del programa o curso.
  },
  {
    key: "010",
    value: "Reinscrito", // El estudiante ha sido reinscrito después de haber estado inactivo o haber sido dado de baja.
  },

  // Estados adicionales relacionados con el registro y pagos
  {
    key: "011",
    value: "Pre-Registrado", // El estudiante ha iniciado el registro pero no ha completado el proceso.
  },
  {
    key: "012",
    value: "Pago Pendiente", // El estudiante ha iniciado el registro pero no ha realizado el pago.
  },
  {
    key: "013",
    value: "Pago Completado", // El estudiante ha completado el pago y está oficialmente inscrito.
  },
  {
    key: "014",
    value: "Inscripción Completada", // El estudiante ha completado el proceso de inscripción.
  },
  {
    key: "015",
    value: "Cuenta Bloqueada", // La cuenta del estudiante está bloqueada, posiblemente por falta de pago u otras razones.
  },
];

export const getStatus = (status: string) => {
  const index = Status.findIndex((s) => s.key == status);
  return index != -1 ? Status[index] : null;
};
