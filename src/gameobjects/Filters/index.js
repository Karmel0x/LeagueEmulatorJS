
const ExtendWTraits = require("../../core/ExtendWTraits");
const _Filters = require("./_Filters");
const PositionHelper = require("../../functions/PositionHelper");

module.exports = (I) => class Filters extends ExtendWTraits(PositionHelper[I], _Filters) {

};
