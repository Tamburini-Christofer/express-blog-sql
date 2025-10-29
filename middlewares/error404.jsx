function error404Handler(req, res, next) {
    res.status(404);
    res.json({
        error: 'Not Found',
        message: 'Pagina non trovata',
    });
};

module.exports = error404Handler;