const placeholderImgSrc = "/static/placeholder.png";

const getFullPlaceholderImageUrl = (req) => {
  const proto = req.headers['x-forwarded-proto'] ||
  req.connection.encrypted ? "https" : "http";

  const fullUrl = proto + '://' + req.get('host') + placeholderImgSrc;
  return fullUrl;
};

const isAllowedUrl = url => url && (url.startsWith("http") || url.startsWith("https"));

module.exports = {
  isAllowedUrl,
  getFullPlaceholderImageUrl
};
