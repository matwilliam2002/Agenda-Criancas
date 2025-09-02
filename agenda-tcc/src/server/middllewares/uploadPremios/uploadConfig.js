const multer = require("multer");
const path = require("path");

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "./imagensPremios")); // pasta onde vai salvar
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // nome único
    }
});

// Apenas imagens (png, jpg, jpeg)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    } else {
        cb(new Error("Apenas imagens PNG ou JPG são permitidas"));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
