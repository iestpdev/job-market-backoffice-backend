import bcrypt from 'bcrypt';
import User from '../../users/models/user.model.js';
import Company from '../../companies/models/company.model.js';
import Student from '../../students/models/student.model.js';
import Tutor from '../../tutors/models/tutor.model.js';
import uploadImageToSupabase from '../../../config/supabase/upload-image.js';

export async function registerUserCompany(conexion, req) {
    const {
        razonSocial, ruc, direccion1,
        rubro,
        contacto1, telefono1, correo1,
        username, userpass
    } = req.body;

    if (!req.file) throw new Error("El logo es obligatorio");

    const usernameTaken = await User.isUsernameTaken(conexion, username);
    if (usernameTaken) throw new Error('El nombre de usuario ya está en uso.');

    await conexion.beginTransaction();
    try {
        const company = new Company();
        company.razonSocial = razonSocial;
        company.logo = '';
        company.ruc = ruc;
        company.direccion1 = direccion1;
        company.rubro = rubro;
        company.contacto1 = contacto1;
        company.telefono1 = telefono1;
        company.correo1 = correo1;

        await company.create(conexion);
        const companyId = company.id;

        const logoUrl = await uploadImageToSupabase(
            process.env.SUPABASE_BUCKET_IMAGES,
            req.file,
            'companies',
            companyId
        );
        await Company.updateLogo(conexion, companyId, logoUrl);

        const hashedPassword = await bcrypt.hash(userpass, 10);
        const user = new User(
            null,
            'COMPANY',
            username,
            hashedPassword,
            companyId,
            null
        );
        await user.create(conexion);

        await conexion.commit();
        return { message: 'Registro exitoso', companyId, userId: user.id };
    } catch (error) {
        await conexion.rollback();
        throw error;
    }
}

export async function registerUserStudent(conexion, data) {
    const { apellidos, nombres, genero, fechNac, tipoDOI, numDOI,  programaEstudioId, esEgresado , username, userpass } = data;

    const usernameTaken = await User.isUsernameTaken(conexion, username);
    if (usernameTaken) throw new Error('El nombre de usuario ya está en uso.');

    await conexion.beginTransaction();
    try {
        const student = new Student(
            null,
            apellidos,
            nombres,
            genero,
            fechNac,
            tipoDOI,
            numDOI,
            programaEstudioId,
            esEgresado,
            null
        );
        await student.create(conexion);

        const hashedPassword = await bcrypt.hash(userpass, 10);
        const user = new User(
            null,
            'STUDENT',
            username,
            hashedPassword,
            null,
            student.id,
        );
        await user.create(conexion);

        await conexion.commit();
        return { message: 'Registro exitoso', studentId: student.id, userId: user.id };
    } catch (error) {
        await conexion.rollback();
        throw error;
    }
}

export async function registerUserTutor(conexion, data) {
    const {
        apellidos,
        nombres,
        genero,
        fechNac,
        tipoDOI,
        numDOI,
        username,
        userpass
    } = data;

    const usernameTaken = await User.isUsernameTaken(conexion, username);
    if (usernameTaken) throw new Error('El nombre de usuario ya está en uso.');

    await conexion.beginTransaction();
    try {
        const tutor = new Tutor(
            null,
            apellidos,
            nombres,
            genero,
            fechNac,
            tipoDOI,
            numDOI
        );
        await tutor.create(conexion);

        const hashedPassword = await bcrypt.hash(userpass, 10);
        const user = new User(
            null,
            'TUTOR',
            username,
            hashedPassword,
            null,
            null,
            tutor.id
        );
        await user.create(conexion);

        await conexion.commit();
        return { message: 'Registro exitoso', tutorId: tutor.id, userId: user.id };
    } catch (error) {
        await conexion.rollback();
        throw error;
    }
}

