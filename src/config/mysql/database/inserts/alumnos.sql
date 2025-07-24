INSERT INTO ALUMNOS (
    APELLIDOS, NOMBRES, GENERO, FECH_NACIMIENTO, TIPO_DOI, NUM_DOI,
    PROGRAMA_ESTUDIO_ID, ES_EGRESADO, CURRICULUM, created_at, updated_at
) VALUES
('Garcia', 'Juan', 'M', '1995-03-12', 'DNI', '12345678', 3, 0, NULL, NOW(), NOW()),
('Martinez', 'Maria', 'F', '1998-07-22', 'CE', '87654321', 2, 1, NULL, NOW(), NOW()),
('Lopez', 'Carlos', 'M', '1990-11-05', 'DNI', '56789012', 4, 0, NULL, NOW(), NOW());
