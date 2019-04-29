const Hapi = require('hapi');
const mongoose = require('mongoose');
const Playlist = mongoose.model('Playlist');

module.exports = (server = new Hapi.Server()) => {
    server.route({
        method: 'post',
        path: '/create-playlist',
        async handler(req, rep) {
            const data = typeof req.payload === 'string' ? JSON.parse(req.payload) : req.payload;
            const { uid, name } = data;

            const pid = Math.random().toString(36).slice(2);
            const playlist = new Playlist({
                pid,
                name,
                owner: uid,
            });

            try {
                await playlist.save();
                return rep.response(true).code(200);
            } catch(err) {
                return rep.response('There was a problem creating a playlist').code(400);
            }
        }
    });
}