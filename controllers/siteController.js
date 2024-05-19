const users = require('../model/user')

exports.getIndex = (req, res) => {
    const userId = req.userId
    const user = users.find(user => user.id === userId)
    res.render('restrito', {user: user});
};
