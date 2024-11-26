

module.exports = (req, res, next) => {
    try {
        res.render('upload');
    } catch (error) {
        res.send(error);
    }
}