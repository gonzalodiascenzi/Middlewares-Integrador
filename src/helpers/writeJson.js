const readJson = require('./readJson');
const filePath = require('./usersPath');
const fs = require('fs');
/////////////////////////////////////////////
module.exports = (newData) => {
    const allUsers = readJson();
    const newUsers = [...allUsers, newData];
    const newUsersJSON = JSON.stringify(newUsers, null, 2);
    fs.writeFileSync(filePath, newUsersJSON);
    return
}