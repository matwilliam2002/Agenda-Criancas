const jwt = require('jsonwebtoken');
const chaveJWT = '0nL_@V-EO^EeZ:!O|)!`'; // ideal: colocar isso no .env

module.exports = function (req, res, next) {
    // Aqui você usou req.header[`authorization`], mas o certo é req.headers["authorization"]
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    // Espera formato: "Bearer tokenAqui"
    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, chaveJWT, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido ou expirado" });
        }

        // Salva os dados do payload (ex.: idPai) na req
        req.usuario = decoded;
        next(); // segue para a rota
    });
};
