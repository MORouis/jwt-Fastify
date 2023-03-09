const {fastify, checkRole} = require('../server')

const { AddUser, ValidateUser, DeveloperAuthorization, DeleteUser } = require("../controllers/controllers")

const addUserOpts = {
    method: "POST",
    url: "/add-user",
    handler: AddUser
}

const validateUserOpts = {
    method: "POST",
    url: "/login",
    handler: ValidateUser
}

const developerOpts = {
    method: 'GET',
    url: '/developer',
    preHandler: [fastify.authentication, checkRole(['Developer', 'Engineer'])],
    handler: DeveloperAuthorization
}

const deleteUserOpts = {
    method: "DELETE",
    url: "/user/:_id",
    handler: DeleteUser
}

const Routes = (fastify, options, done) => {
    fastify.route(addUserOpts)
    fastify.route(validateUserOpts)
    fastify.route(developerOpts)
    fastify.route(deleteUserOpts)

    done()
}
module.exports = Routes