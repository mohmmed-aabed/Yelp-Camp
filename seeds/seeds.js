const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const dbUrl = "mongodb://localhost:27017/yelp-camp";

// ------------------------------------------------------
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected!");
});

// ------------------------------------------------------
const randomElementInArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// ------------------------------------------------------
const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "5fe056878d59033c5c80e2f8",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${randomElementInArray(descriptors)} ${randomElementInArray(
        places
      )}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/deqv0i9aa/image/upload/v1608743006/YelpCamp/tlpsbbagpz1c02bnvqvq.jpg",
          filename: "YelpCamp/tlpsbbagpz1c02bnvqvq",
        },
        {
          url:
            "https://res.cloudinary.com/deqv0i9aa/image/upload/v1608743010/YelpCamp/bb3syzgefbuulyjaqwd5.jpg",
          filename: "YelpCamp/bb3syzgefbuulyjaqwd5",
        },
      ],
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque dignissimos vitae optio dolore, rem voluptas nulla beatae vero, nisi iste accusamus repellat. Blanditiis natus veniam ducimus suscipit praesentium optio unde!",
      price: randomPrice,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
