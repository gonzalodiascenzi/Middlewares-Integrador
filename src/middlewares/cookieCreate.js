const readJson = require('../helpers/readJson');

module.exports = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else if (req.cookies.user) {
        const users = readJson();
        const userFound = users.find(user => user.id == req.cookies.user)
        if(!userFound){
            console.log('No se encontra antiguo id');
        }
        req.session.user = userFound;
        return next();
    } else {
        return next();
    }
}