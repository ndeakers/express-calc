/** Simple demo Express app. */
const { findMean, findMedian, findMode } = require('./stats')
const { convertStrNums } = require('./utils')
const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res, next) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  let nums = req.query.nums.split(",");
  nums = convertStrNums(nums);
  console.log("converted nums", nums)
  let value = findMean(nums);
  return res.json({
    operation: "mean",
    value
  })
})


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function(req, res, next) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  let nums = req.query.nums.split(",");
  nums = convertStrNums(nums);
  return res.json({
    operation: "median",
    value: findMedian(nums)
  });
});


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function(req, res, next) {
  if (!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  let nums = req.query.nums.split(",");
  nums = convertStrNums(nums);
  return res.json({
    operation: "mode", 
    value: findMode(nums)
  });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;