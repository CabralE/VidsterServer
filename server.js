// ________________________
// DEPEENDENCIES
// ________________________
// get .env file
require('dotenv').config();
// pull PORT from .env file
const { PORT = 3000, MONGODB_URL } = process.env;
// pull in express
const express = require('express');
// create express app
const app = express();
// pull in mongoose and connect to mongoDB
const mongoose = require('mongoose');
// import  middleware
const cors = require('cors');
const morgan = require('morgan');


// ________________________
// DATA CONNECTION
// ________________________

// connect to mongodb
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Connect Events
mongoose.connection
    .on('connected', () => console.log('Mongoose is connected'))
    .on('error', (err) => console.log(err))
    .on('disconnected', () => console.log('Mongoose is disconnected'));


// ________________________
// MODELS
// ________________________

const VidPlaylistSchema = new mongoose.Schema({
    userName: String,
    playlistName: String,
    playlistTags: String,
});

const VidPlaylist = mongoose.model('VidPlaylist', VidPlaylistSchema);

const VideoSchema = new mongoose.Schema({
    vidName: String,
    vidUrl: String,
    vidChannel: String,
    vidCategories: String,
    playlistID: String,
    vidComments: String,
    vidRating: String
})

const Video = mongoose.model('Video', VideoSchema);
// ________________________
// MIDDLEWARE
// ________________________
app.use(cors()); // enable cors
app.use(morgan('dev')); // log requests to console
app.use(express.json()); // enable json parsing

// ________________________
// ROUTES
// ________________________

// get request to root  
app.get('/', (req, res) => {
    res.send('Lets do this!!');
});  // end get request to root

// Playlist index route
app.get("/playlist", async (req, res) => {
    const playlists = await VidPlaylist.find();
    console.log(playlists)
    res.json(playlists);
});

// Playlist create route
app.post("/playlist", async (req, res) => {
    const playlist = await VidPlaylist.create(req.body);
    res.json(playlist);
});

// Playlist update route
app.put("/playlist/:id", async (req, res) => {  
    const playlist = await VidPlaylist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(playlist);
});

// Playlist delete route
app.delete("/playlist/:id", async (req, res) => {
    await VidPlaylist.findByIdAndDelete(req.params.id);
    res.json({ message: "Playlist deleted" });
});

//Playlist Show Route & Video Index Route
app.get("/playlist/:id/", async (req, res) => {
    const videos = await Video.find({ playlistID : req.params.id })

  res.json(videos);
});

    // Video create route
    app.post(`/playlist/newvideo`, async (req, res) => {
        const video = await Video.create(req.body);
        res.json(video);
    });
    
    //TODO Remaining video routes
// Video update route
app.put("/playlist/:vidID", async (req, res) => {  
    const video = await Video.findByIdAndUpdate(req.params.vidID, req.body, { new: true });
    res.json(video);
});

//Video delete route
app.delete("/playlist/:id/:vidID", async (req, res) => {
    await Video.findByIdAndDelete(req.params.vidID);
    res.json({ message: "Video deleted" });
});

// ________________________
// Listener
// ________________________
// listen on port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})   // end app.listen 