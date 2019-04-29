const Hapi = require('hapi');
const mongoose = require('mongoose');
const Playlist = mongoose.model('Playlist');

module.exports = (server = new Hapi.Server()) => {
    server.route({
        method: 'get',
        path: '/get-playlists',
        async handler(req, rep) {
            const data = typeof req.query === 'string' ? JSON.parse(req.query) : req.query;
            const { uid } = data;

            try { return await Playlist.find({ owner: uid }); }
            catch(err) { return rep.response([]).code(200); }
        }
    });
}