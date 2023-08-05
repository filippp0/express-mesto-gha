const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants;

// console.log(badRequestStatus);

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
};
