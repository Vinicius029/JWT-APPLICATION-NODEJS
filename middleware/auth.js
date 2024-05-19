const jwt = require('jsonwebtoken');
require('dotenv').config();

// function verifyToken(req, res, next) {
//     //const bearerHeader = req.headers.authorization;
//     const bearerHeader = req.cookies.token;
//     if (!bearerHeader) {
//         return res.status(401).json({ message: "Token não fornecido" });
//     }
//     const token = bearerHeader.split(' ')[1]; // Assume Bearer Token
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Token inválido" });
//         }

//         if (revokedTokens.includes(token)) {
//             return res.status(401).json({ message: "Token inválido ou expirado" });
//         }

//         req.userId = decoded.userId;
//         next();
//     });
// }

function verifyToken(req, res, next) {
    const token = req.cookies.token; // Assume que o token é recebido via cookie agora
    if (!token) {
        //return res.status(401).json({ message: "Token não fornecido" });
        res.redirect('/?error=' + encodeURIComponent('Sessão Encerrada, faça login novamente!'));
        return;
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

    
        req.userId = decoded.userId;
        //req.user = user;
        next();
    });
}

module.exports = verifyToken; // Exporta o middleware
