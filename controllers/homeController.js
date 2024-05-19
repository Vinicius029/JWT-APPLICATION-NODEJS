exports.getIndex = (req, res) => {
    const errorMessage = req.query.error; // Captura a mensagem de erro da query string
    res.render('index', { error: errorMessage, title: 'Home Page'});
}
