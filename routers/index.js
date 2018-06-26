const user = require("./user");
const menu = require('./menu')
const params = require('./params')
module.exports = function (app) {
    app.use(user.routes()).use(user.allowedMethods());
    app.use(menu.routes()).use(menu.allowedMethods());
    app.use(params.routes()).use(params.allowedMethods());
}