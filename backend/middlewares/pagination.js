const HttpError = require("../models/http-error");

const pagination = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
      results.hasMore = true;
    } else {
      results.hasMore = false;
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      return next(new HttpError("Something went wrong.", 500));
    }
  };
};

module.exports = pagination;
