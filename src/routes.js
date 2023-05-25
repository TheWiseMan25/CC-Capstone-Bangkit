const { registerAccount } = require("./handler")

const routes = [
    {
        method: "POST",
        path: "/register",
        handler: registerAccount
    }
]

module.exports = routes