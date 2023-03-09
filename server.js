const fastify = require('fastify')()
const jwt = require("@fastify/jwt")

fastify.register(jwt, {
    secret: "supersecret"
})

//authentication
fastify.decorate("authentication", async (req, reply) => {
    try {
        await req.jwtVerify()
    } catch (error) {
        reply.send(error)
    }
})

//authorization
const checkRole = (allowedRoles) => (async (req, reply) => {
    try {
        const user= req.user
        console.log(user)
        if (!user) {
            throw new Error('Invalid username')
        }
        if(!allowedRoles.includes(user.role)){
            throw new Error('Unauthorized')
        }
    } catch (error) {
        reply.status(401).send({ error: 'Unauthorized' })
    }
})

module.exports = {fastify, checkRole}