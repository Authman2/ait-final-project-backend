const Hapi = require('hapi');
const DBHelper = require('../DBHelper');

module.exports = (server = new Hapi.Server()) => {
    server.route({
        method: 'get',
        path: '/login',
        async handler(req, rep) {
            const data = typeof req.query === 'string' ? JSON.parse(req.query) : req.query;
            const { email, password } = data;

            const alreadyExisting = await DBHelper.findExistingUser(email, password);
            if(alreadyExisting) {
                return rep.response(alreadyExisting).code(200);
            } else {
                return rep.response(`There was a problem logging in. Either the username or password is wrong.`).code(400);
            }
        }
    });
}