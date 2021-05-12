const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  strNums = strNums.map(function (val) {
    if (!Number(val)) {
      throw BadRequestError;
    }
    return Number(val);
  });
  return strNums;
}


module.exports = { convertStrNums };