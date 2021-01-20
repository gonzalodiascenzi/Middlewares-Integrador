const readJson = require('./readJson');
/////////////////////////////////////////////
module.exports = () => {
    const allUsers = readJson();

    return allUsers.length == 0 ? 1 : allUsers.pop().id + 1;
}