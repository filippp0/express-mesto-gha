const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
};
