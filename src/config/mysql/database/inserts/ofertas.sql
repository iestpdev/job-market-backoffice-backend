INSERT INTO OFERTAS (
    EMPRESA_ID, TITULO, DESCRIPCION, SUELDO, AD_HONOREM, VIATICOS, BONOS,
    REQUISITOS, BENEFICIOS, NUM_VACANTES, FECHA_PUBLICACION, FECHA_CIERRE,
    CONTACTO, CORREO, TELEFONO, created_at, updated_at
) VALUES
(
    1, -- EMPRESA_ID: TecnoInnov (ID 1)
    'Desarrollador Backend Senior',
    'Buscamos desarrollador con experiencia en Node.js y arquitecturas de microservicios para unirse a nuestro equipo de tecnología.',
    4500, -- SUELDO
    FALSE, -- AD_HONOREM
    300, -- VIATICOS
    500, -- BONOS
    '5+ años en desarrollo backend, experiencia con AWS, dominio de Node.js y Express',
    'Seguro médico, bonos por desempeño, horario flexible, trabajo remoto 3 días/semana',
    2, -- NUM_VACANTES
    '2024-05-01 09:00:00', -- FECHA_PUBLICACION
    '2024-06-15 23:59:59', -- FECHA_CIERRE
    'Ricardo Gómez', -- CONTACTO
    'rh@tecninnov.com', -- CORREO
    '987654321', -- TELEFONO
    NOW(), -- created_at
    NOW()  -- updated_at
),
(
    2, -- EMPRESA_ID: Alimentos Saludables (ID 2)
    'Nutricionista Clínico',
    'Puesto para nutricionista con experiencia en consulta clínica y planificación dietética.',
    2800, -- SUELDO
    FALSE, -- AD_HONOREM
    150, -- VIATICOS
    NULL, -- BONOS
    'Licenciatura en Nutrición, 3 años de experiencia mínima, registro profesional vigente',
    'Capacitaciones pagadas, comisiones por consultas adicionales, horario de lunes a viernes',
    1, -- NUM_VACANTES
    '2024-05-10 10:30:00', -- FECHA_PUBLICACION
    '2024-05-31 18:00:00', -- FECHA_CIERRE
    'María Fernández', -- CONTACTO
    'rrhh@alimentossalud.com', -- CORREO
    '912345678', -- TELEFONO
    NOW(), -- created_at
    NOW()  -- updated_at
),
(
    3, -- EMPRESA_ID: Consultoría Empresarial (ID 3)
    'Práctica Profesional en Consultoría',
    'Oportunidad para estudiantes de últimos ciclos de Administración o Economía.',
    NULL, -- SUELDO
    TRUE, -- AD_HONOREM (sin remuneración)
    100, -- VIATICOS
    NULL, -- BONOS
    'Estudiante de últimos ciclos, disponibilidad de 20h/semana, inglés intermedio',
    'Certificado de prácticas, posibilidad de contratación, capacitación en metodologías ágiles',
    3, -- NUM_VACANTES
    '2024-05-15 08:00:00', -- FECHA_PUBLICACION
    '2024-05-30 17:00:00', -- FECHA_CIERRE
    'Departamento de Talentos', -- CONTACTO
    'practicas@consultoriaemp.com', -- CORREO
    NULL, -- TELEFONO
    NOW(), -- created_at
    NOW()  -- updated_at
);