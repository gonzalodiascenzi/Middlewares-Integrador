const pathFile = require('../helpers/usersPath');
const fs = require('fs');
/////////////////////////////////////////////
module.exports = () => {
    return JSON.parse(fs.readFileSync(pathFile, 'utf-8'))
}