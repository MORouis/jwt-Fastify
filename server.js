const fastify = require('fastify')()
const jwt = require("@fastify/jwt")

fastify.register(jwt, {
    secret: "supersecret"
})

//authentication decorator
fastify.decorate("authenticate", async function (req, reply) {
    try {
        await req.jwtVerify()
    } catch (error) {
        reply.send(error)
    }
})

module.exports = fastify