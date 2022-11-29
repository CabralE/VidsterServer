import database from "../database/connection.js";
import User from "../models/User.js";
import Playlist from "../models/Playlist.js";
import bcrypt from "bcrypt";
import Video from "../models/Video.js";

const insertData = async () => {
  await database.dropDatabase();

  // create users
  const user1 = new User({
    username: "chris",
    email: "chris@super.gmail.com",
    password_digest: await bcrypt.hash("!a$ecureP@ssw0Rd55!", 11),
    playlists: [],
  });
  await user1.save();

  const user2 = new User({
    username: "raul",
    email: "raul@super.gmail.com",
    password_digest: await bcrypt.hash("!$h0pp3R1", 11),
    playlists: [],
  });
  await user2.save();

  // create playlists
  const playlist1 = new Playlist({
    playlistName: "Queens's Hidden Beach",
    playlistTag: "rock & roll",
    image:
      "https://thumbs.dreamstime.com/b/hallett-s-cove-beach-along-east-river-astoria-queens-new-york-summer-view-roosevelt-island-205164323.jpg",
    // user: user1,
  });

  await playlist1.save();

  const playlist2 = new Playlist({
    playlistName: "A Walk through Trees",
    playlistTag: "Hip-hop",
    image:
      "https://neighborhoodsnow.nyc/wp-content/uploads/2020/10/NYCDOT_34-Ave-QN-1024x768.jpg",
    // user: user2,
  });

  await playlist2.save();

  //create videos
  const video1 = new Video({
    videoName: "Relations with Mongo",
    videoUrl: "https://www.youtube.com/watch?v=Tn4nLb9aIuA",
    videoChannel: "Alex Merced - Full Stack Developer",
    videoCategories: "codingVideo",
  });

  video1.save();

  const video2 = new Video({
    videoName:
      "AM Coder - How to setup, source control and deploy a basic html/css/js project",
    videoUrl: "https://www.youtube.com/watch?v=gKoNZUhwmEM",
    videoChannel: "Alex Merced - Full Stack Developer",
    videoCategories: "codingVideo",
  });

  video2.save();

  const video3 = new Video({
    videoName:
      "Full CRUD Express/Mongo API with JWT Auth in 12 minutes with mongorester",
    videoUrl:
      "https://www.youtube.com/watch?v=C06RUsTzP_U&list=PLY6oTPmKnKbaSCVF-Imd1hkQJvl8iLrV3&index=11",
    videoChannel: "Alex Merced - Full Stack Developer",
    videoCategories: "codingVideo",
  });

  video3.save();
  playlist1.videos.push(video1);
  await playlist1.save();
  playlist1.videos.push(video2);
  await playlist1.save();
  playlist2.videos.push(video3);
  await playlist2.save();
  user1.playlists.push(playlist1);
  await user1.save();
  user2.playlists.push(playlist2);
  await user2.save();
  console.log("Created users,playlists and videos!");

  database.close();
};

insertData();
