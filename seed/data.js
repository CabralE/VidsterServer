import database from "../db/connection.js";
// import Student from "../models/Student.js";
import User from "../models/User.js";
// import Blog from "../models/blog.js";
import bcrypt from "bcrypt";

const insertData = async () => {
  // reset database
  await datebase.dropDatabase();

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
  const blog1 = new Blog({
    title: "Queens's Hidden Beach",
    image:
      "https://thumbs.dreamstime.com/b/hallett-s-cove-beach-along-east-river-astoria-queens-new-york-summer-view-roosevelt-island-205164323.jpg",
    tagline: "Hidden Beach in Astoria - NYC",
    description:
      "This is a wonderful gem right in Queens NY! Just a short bike ride down 31st avenue...keep going until you hit the water! There is a beautiful little beach with a dog-friendly cafe right across the street!",
    user: user1,
  });

  await blog1.save();

  const blog2 = new Blog({
    title: "A Walk through Trees",
    image:
      "https://neighborhoodsnow.nyc/wp-content/uploads/2020/10/NYCDOT_34-Ave-QN-1024x768.jpg",
    tagline: "Closed Avenue becomes Walkers Paradise",
    description:
      "Join members of the most culturely diverse neighborhood in the world through an avenue closed to traffic, but open to the public! The historic district of Queens boasts some of the city's most beautiful flowering trees and gardens!",
    user: user2,
  });

  await blog2.save();

  user1.blogs.push(blog1);
  await user1.save();
  user2.blogs.push(blog2);
  await user2.save();

  // create students
  const student1 = new Student({
    name: "Raul",
    school: "General Assembly",
    age: 36,
    image:
      "https://sportshub.cbsistatic.com/i/2021/08/09/bc1a467e-8fc2-4ccd-b97c-72da7af980df/my-hero-academia-all-might-cosplay-1275931.jpg",
  });
  await student1.save();

  const student2 = new Student({
    name: "Chris",
    school: "General Assembly",
    age: 24,
    image:
      "https://static.onecms.io/wp-content/uploads/sites/6/2011/08/benjamin-sisko_320.jpg",
  });
  await student2.save();

  const student3 = new Student({
    name: "Greg",
    school: "General Assembly",
    age: 18,
    image:
      "https://www.gannett-cdn.com/presto/2022/01/26/NTEG/712586aa-71b8-4320-96a2-82d116a91397-AP22025838559973.jpg",
  });
  await student3.save();

  const student4 = new Student({
    name: "Iffat",
    school: "General Assembly",
    age: 21,
    image: "https://ssb.wiki.gallery/images/b/b5/Ifrit.png",
  });
  await student4.save();

  console.log("Created users and students!");

  // close database connection
  db.close();
};

insertData();
