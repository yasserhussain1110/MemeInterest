const settings = {
  meme: {
    title: "MemeInterest: Add your favorite memes"
  },
  pin: {
    title: "Pinterest Clone: Add you favorite images"
  }
};

module.exports = settings[process.env.FRIENDLY ? "meme" : "pin"];
