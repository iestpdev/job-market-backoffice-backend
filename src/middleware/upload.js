import multer from 'multer';

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf'
];

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes (.jpg, .png, .webp) y PDFs.'));
    }
  }
});

export default upload;