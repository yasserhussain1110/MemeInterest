const placeholderImgSrc = "/static/placeholder.png";

const constructFullUrlFromRequest = (req) => {
  const proto = req.headers['x-forwarded-proto'] ||
  req.connection.encrypted ? "https" : "http";

  const fullUrl = proto + '://' + req.get('host') + placeholderImgSrc;
  return fullUrl;
};

module.exports = {
  constructFullUrlFromRequest
};
