"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function calcYards(play) {
  var start = play.start,
      end = play.end,
      away = play.away;


  var away2Absolute = function away2Absolute(location) {
    return 50 - location + 50;
  };
  var startLoc = start.locationAlias === away.alias ? away2Absolute(start.location) : start.location;
  var endLoc = end.locationAlias === away.alias ? away2Absolute(end.location) : end.location;

  var gained = endLoc - startLoc;
  if (start.possession === away.alias) {
    gained *= -1;
  }

  return gained;
}

exports.default = calcYards;