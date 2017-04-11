const auth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(400).send();
  }
};

module.exports = auth;
