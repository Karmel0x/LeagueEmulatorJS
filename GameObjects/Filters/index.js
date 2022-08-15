
const ExtendWTraits = require("../../Core/ExtendWTraits");
const _Filters = require("./_Filters");
const PositionHelper = require("../../Functions/PositionHelper");

module.exports = (I) => class Filters extends ExtendWTraits(PositionHelper[I], _Filters) {

};
