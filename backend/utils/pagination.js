const HttpError = require("../models/http-error");

const pagination = (model, page = 1, limit = 2) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  // if (startIndex > 0) {
  //   results.previous = {
  //     page: page - 1,
  //     limit: limit,
  //   };
  // }

  if (endIndex < model.length) {
    // results.next = {
    //   page: page + 1,
    //   limit: limit,
    // };
    results.hasMore = true;
  } else {
    results.hasMore = false;
  }

  try {
    results.results = model.slice(startIndex, endIndex);
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  return results;
};

module.exports = pagination;
