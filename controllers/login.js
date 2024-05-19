const jwt = require('jsonwebtoken')
const users = require('../model/user')
require('dotenv').config();

exports.postLogin = (req, res) => {
        const { username, password } = req.body

        const user = users.find(user => user.username === username && user.password === password)

        if (!user) { 
                //return res.status(401).json({ message: "Usuario ou Senha Inválido!" }) 
                res.redirect('/?error=' + encodeURIComponent('Usuário ou Senha Inválido! Tente Novamente...'))
                return;
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "30m" })
        const expires = new Date(Date.now() + 60000 * 30);

        res.cookie('token', token, {
                httpOnly: true,
                secure: true, // set true in production if using HTTPS
                expires: expires,
                sameSite: 'strict'
        });
        //res.render('restrito', { user: user });
        res.redirect('/restrito');

}


// const { username, password } = req.body;
// // Validação de credenciais aqui
// if (username === "vinicius" && password === "123456") {
//         const token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY, { expiresIn: '1h' });
//         res.cookie('token', token, {
//                 httpOnly: true,
//                 secure: true, // set true in production if using HTTPS
//                 sameSite: 'strict' // can be 'strict', 'lax', or 'none'
//         });
//         res.send('Login bem-sucedido!');
// } else {
//         res.status(401).send('Credenciais inválidas');
// }
