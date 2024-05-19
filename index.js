const express = require('express')
const app = express()
const port = 3001
const router = require('./router.js')
require('dotenv').config();


const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Servir arquivos estáticos do Bootstrap
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));


// Configurando EJS
app.set('view engine', 'ejs');
app.set('views', 'views'); // Diretório onde as views serão armazenadas

// Rotas
app.use(router)

// app.post('/sair', (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (token) {
//         revokedTokens.push(token);
//         res.send("Sessão encerrada com sucesso.");
//     } else {
//         res.status(401).json({ message: "Token não fornecido" });
//     }
// });

app.post('/logout', (req, res) => {
    // Limpar o cookie que contém o token JWT
    res.cookie('token', '', { 
        httpOnly: true,
        secure: true, // usar true em produção se estiver usando HTTPS
        expires: new Date(0), // Define a data de expiração para uma data passada
        sameSite: 'strict'
    });
    res.send('Você saiu com sucesso!');
});


app.listen(port, () => {
    console.log('Servidor rodando na porta: ' + port)
})