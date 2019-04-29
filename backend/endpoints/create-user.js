const Hapi = require('hapi');
const DBHelper = require('../DBHelper');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (server = new Hapi.Server()) => {
    server.route({
        method: 'post',
        path: '/create-user',
        async handler(req, rep) {
            const data = typeof req.payload === 'string' ? JSON.parse(req.payload) : req.payload;
            const { email, username, password } = data;

            const alreadyExisting = await DBHelper.findExistingUser(email);
            if(alreadyExisting)
                return rep.response(`A user with the email ${email} already exists.`).code(400);
            else {
                const options = { email, name: username, password, uid: Math.random().toString(36).slice(2) };
                const user = new User(options);
                user.save();
                return rep.response(options).code(200);
            }
        }
    });
}