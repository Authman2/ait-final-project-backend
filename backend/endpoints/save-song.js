const Hapi = require('hapi');
const mongoose = require('mongoose');
const Song = mongoose.model('Song');

module.exports = (server = new Hapi.Server()) => {
    server.route({
        method: 'post',
        path: '/save-song',
        async handler(req, rep) {
            const data = typeof req.payload === 'string' ? JSON.parse(req.payload) : req.payload;
            const { pid, sid, title, numPianoTracks, numDrumTracks } = data;

            // Take the sound URLs and the other data and either update the song
            // or create a new one.
            const found = await Song.findOne({ sid: sid });
            if(found) {
                found.name = song.title;
                found.numPianoTracks = numPianoTracks;
                found.numDrumTracks = numDrumTracks;
                found.save();
                return rep.response('Saved the existing song!').code(200);
            } else {
                const newSong = new Song({
                    sid,
                    name: title,
                    playlist: pid,
                    numPianoTracks,
                    numDrumTracks,
                    created: Date.now(),
                });
                newSong.save();
                return rep.response('Created a new song!').code(200);
            }
        }
    });
}