'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var TYPE_FIELDGOAL = _constants.playTypes.TYPE_FIELDGOAL,
    TYPE_EXTRA_POINT = _constants.playTypes.TYPE_EXTRA_POINT;


function calcYards(play) {
  var start = play.start,
      end = play.end,
      home = play.home,
      away = play.away;


  var possTeam = end.possession === 'home' ? home.alias : away.alias;
  var away2Absolute = function away2Absolute(location) {
    return 50 - location + 50;
  };
  var startLoc = start.locationAlias === away.alias ? away2Absolute(start.location) : start.location;
  var endLoc = end.locationAlias === away.alias ? away2Absolute(end.location) : end.location;

  var gained = endLoc - startLoc;
  if (end.possession === away.alias) {
    gained *= -1;
  }

  if (start.locationAlias === end.locationAlias) {
    switch (play.base.type) {
      case TYPE_EXTRA_POINT:
        gained = 32;
        break;

      case TYPE_FIELDGOAL:
        if (start.locationAlias === possTeam) {
          gained = 50 - start.location + 67;
        } else {
          gained = start.location + 17;
        }
        break;

      default:
        break;
    }
  }

  return gained;
}

exports.default = calcYards;