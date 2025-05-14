INSERT INTO POSTULACIONES (
    OFERTA_ID,
    ALUMNO_ID,
    FECHA_POSTULACION,
    ESTADO_RESPUESTA,
    DOC_ADJUNTO1,
    DOC_ADJUNTO2,
    DOC_ADJUNTO3,
    DOC_ADJUNTO4,
    created_at,
    updated_at
) VALUES
-- Postulación 1: Aprobada
(
    1, -- OFERTA_ID (Oferta 1)
    1, -- ALUMNO_ID (Alumno 1)
    '2024-05-10 09:15:00', -- FECHA_POSTULACION
    'APPROVED', -- ESTADO_RESPUESTA
    'https://drive.example.com/docs/cv_alumno1.pdf', -- DOC_ADJUNTO1
    NULL, -- DOC_ADJUNTO2
    NULL, -- DOC_ADJUNTO3
    NULL, -- DOC_ADJUNTO4
    '2024-05-10 09:15:00', -- created_at
    '2024-05-12 14:30:00' -- updated_at
),

-- Postulación 2: Pendiente
(
    3, -- OFERTA_ID (Oferta 3)
    2, -- ALUMNO_ID (Alumno 2)
    '2024-05-15 11:20:00', -- FECHA_POSTULACION
    'PENDING', -- ESTADO_RESPUESTA
    'https://drive.example.com/docs/cv_alumno2.pdf', -- DOC_ADJUNTO1
    'https://drive.example.com/docs/cert_alumno2.pdf', -- DOC_ADJUNTO2
    NULL, -- DOC_ADJUNTO3
    NULL, -- DOC_ADJUNTO4
    '2024-05-15 11:20:00', -- created_at
    '2024-05-15 11:20:00' -- updated_at
),

-- Postulación 3: Rechazada
(
    4, -- OFERTA_ID (Oferta 4)
    18, -- ALUMNO_ID (Alumno 18)
    '2024-05-05 14:45:00', -- FECHA_POSTULACION
    'REJECTED', -- ESTADO_RESPUESTA
    'https://drive.example.com/docs/cv_alumno18.pdf', -- DOC_ADJUNTO1
    NULL, -- DOC_ADJUNTO2
    'https://drive.example.com/docs/ref_alumno18.pdf', -- DOC_ADJUNTO3
    NULL, -- DOC_ADJUNTO4
    '2024-05-05 14:45:00', -- created_at
    '2024-05-08 10:15:00' -- updated_at
),

-- Postulación 4: Pendiente
(
    5, -- OFERTA_ID (Oferta 5)
    20, -- ALUMNO_ID (Alumno 20)
    '2024-05-18 16:30:00', -- FECHA_POSTULACION
    'PENDING', -- ESTADO_RESPUESTA
    'https://drive.example.com/docs/cv_alumno20.pdf', -- DOC_ADJUNTO1
    NULL, -- DOC_ADJUNTO2
    NULL, -- DOC_ADJUNTO3
    NULL, -- DOC_ADJUNTO4
    '2024-05-18 16:30:00', -- created_at
    '2024-05-18 16:30:00' -- updated_at
),

-- Postulación 5: Aprobada
(
    6, -- OFERTA_ID (Oferta 6)
    1, -- ALUMNO_ID (Alumno 1)
    '2024-05-12 10:00:00', -- FECHA_POSTULACION
    'APPROVED', -- ESTADO_RESPUESTA
    'https://drive.example.com/docs/cv_alumno1_v2.pdf', -- DOC_ADJUNTO1
    'https://drive.example.com/docs/portafolio_alumno1.pdf', -- DOC_ADJUNTO2
    'https://drive.example.com/docs/cert_alumno1.pdf', -- DOC_ADJUNTO3
    NULL, -- DOC_ADJUNTO4
    '2024-05-12 10:00:00', -- created_at
    '2024-05-14 09:00:00' -- updated_at
);
