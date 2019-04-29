// db.js
const mongoose = require('mongoose');
const creds = { password: process.env.MONGO_PASSWORD };

// 1.) Define the schemas
const SongSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created: { type: String, required: true },
    sid: { type: String, required: true },
    numPianoTracks: { type: Number, required: false},
    numDrumTracks: { type: Number, required: false },
    playlist: { type: String, required: true }
});
const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    pid: { type: String, required: true },
});
const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// 2.) Define the models.
mongoose.model('Song', SongSchema, 'Songs');
mongoose.model('Playlist', PlaylistSchema, 'Playlists');
mongoose.model('User', UserSchema, 'Users');

// 3.) Connect to the MongoDB server.
mongoose.connect(`mongodb+srv://authman2:${creds.password}@aitfinalproject-7d88m.mongodb.net/test?retryWrites=true`, {
    dbName: "FinalProject"
}).then((res) => {
    console.log("---> Connected to DB!");
}).catch((err) => {
    console.log("---> Error: ", err);
});