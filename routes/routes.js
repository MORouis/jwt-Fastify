const fastify = require('../server')

const { generateToken, validateToken, showMessage } = require("../controllers/controllers")

const generateTokenOpts = {
    method: "GET",
    url: "/generateToken/:id",
    handler: generateToken
}

const validateTokenOpts = {
    method: "GET",
    url: "/validateToken",
    preHandler: fastify.authenticate,
    handler: validateToken
}

const showMessageOpts = {
    method: "GET",
    url: "/home",
    preHandler: fastify.authenticate,
    handler: showMessage
}

const Routes = (fastify, options, done) => {
    fastify.route(generateTokenOpts)
    fastify.route(validateTokenOpts)
    fastify.route(showMessageOpts)

    done()
}
module.exports = Routes