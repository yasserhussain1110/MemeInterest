const settings = {
  meme: {
    app: {
      title: "MemeInterest: Add your favorite memes"
    },
    nav: {
      all: "All Memes",
      my: "My Memes"
    }
  },
  pin: {
    app: {
      title: "Pinterest Clone: Add you favorite images"
    },
    nav: {
      all: "All Pics",
      my: "My Pics"
    }
  }
};

module.exports = settings[process.env.FRIENDLY ? "meme" : "pin"];
