const httpConstants = require('http2').constants;

// console.log(badRequestStatus);

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_BAD_REQUEST;
  }
};
