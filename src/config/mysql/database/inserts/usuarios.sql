INSERT INTO USUARIOS (TIPO, USERNAME, USERPASS, EMPRESA_ID, ALUMNO_ID, is_active, created_at, updated_at) 
VALUES 
    ('COMPANY', 'empresa2_user', '$2b$10$5IY.nxGwxy8MVe9KwwXCsu4LwPlsH3EI0dz7s0qLg.NQBOce/3PR2', 2, NULL, TRUE, NOW(), NOW()),
    ('STUDENT', 'alumno18_user', '$2b$10$5IY.nxGwxy8MVe9KwwXCsu4LwPlsH3EI0dz7s0qLg.NQBOce/3PR2', NULL, 18, TRUE, NOW(), NOW()),
    ('ADMIN', 'sysadmin', '$2b$10$5IY.nxGwxy8MVe9KwwXCsu4LwPlsH3EI0dz7s0qLg.NQBOce/3PR2', NULL, NULL, TRUE, NOW(), NOW());
