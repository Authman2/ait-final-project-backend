const Hapi = require('hapi');
const mongoose = require('mongoose');
const Song = mongoose.model('Song');

module.exports = (server = new Hapi.Server()) => {
    server.route({
        method: 'get',
        path: '/get-songs',
        async handler(req, rep) {
            const data = typeof req.query === 'string' ? JSON.parse(req.query) : req.query;
            const { pid } = data;

            try { return await Song.find({ playlist: pid }); }
            catch(err) { return rep.response([]).code(200); }
        }
    });
}