// api.js: This is where most of the server-side actions will go instead of
// storing everything right next to the express code.
require('./db');
const Hapi = require('hapi').Server;

const CreateUser = require('./endpoints/create-user');
const Login = require('./endpoints/login');
const GetPlaylists = require('./endpoints/get-playlists');
const GetSongs = require('./endpoints/get-songs');
const CreatePlaylist = require('./endpoints/create-playlist');
const SaveSong = require('./endpoints/save-song');

const server = new Hapi({
    port: process.env.PORT || 1000,
    routes: {
        cors: true
    }
});

CreateUser(server);
Login(server);
GetPlaylists(server);
GetSongs(server);
CreatePlaylist(server);
SaveSong(server);

const init = async () => {
    await server.start();
    console.log('---> Running API!');
}
init();