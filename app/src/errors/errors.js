class InvalidRequestError extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "InvalidRequestError"; // (2)
    }
}

class BadRequestError extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "BadRequestError"; // (2)
    }
}

module.exports = {
    InvalidRequestError: InvalidRequestError,
    BadRequestError: BadRequestError
}