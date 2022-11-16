import database from "../database/connection.js";
import User from "../models/User.js";
import Playlist from "../models/Playlist.js";
import bcrypt from "bcrypt";

const insertData = async () => {
  await database.dropDatabase();

  // create users
  const user1 = new User({
    username: "chris",
    email: "chris@super.gmail.com",
    password_digest: await bcrypt.hash("!a$ecureP@ssw0Rd55!", 11),
    // playlists: [],
  });
  await user1.save();

  const user2 = new User({
    username: "raul",
    email: "raul@super.gmail.com",
    password_digest: await bcrypt.hash("!$h0pp3R1", 11),
    // playlists: [],
  });
  await user2.save();

  // create playlists
  const playlist1 = new Playlist({
    playlistName: "Queens's Hidden Beach",
    playlistTag: "rock & roll",
    image:
      "https://thumbs.dreamstime.com/b/hallett-s-cove-beach-along-east-river-astoria-queens-new-york-summer-view-roosevelt-island-205164323.jpg",
    user: user1,
  });

  await playlist1.save();

  const playlist2 = new Playlist({
    playlistName: "A Walk through Trees",
    playlistTag: "Hip-hop",
    image:
      "https://neighborhoodsnow.nyc/wp-content/uploads/2020/10/NYCDOT_34-Ave-QN-1024x768.jpg",
    user: user2,
  });

  await playlist2.save();

  user1.playlists.push(playlist1);
  await user1.save();
  user2.playlists.push(playlist2);
  await user2.save();
  console.log("Created users and playlists!");

  database.close();
};

insertData();
