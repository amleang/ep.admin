const user = require("./user");
const menu = require('./menu')
module.exports = function (app) {
    app.use(user.routes()).use(user.allowedMethods());
    app.use(menu.routes()).use(menu.allowedMethods());
}