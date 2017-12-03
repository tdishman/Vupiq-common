/* eslint-disable no-console */
let Functions = require('./lib').Functions;

let playBonuses = {
  'PASS': {
    'details': [{
      'metric': 'Yards',
      'variants': {
        '10orLess': {'max': 10, 'points': 1.5},
        '11-20': {'max': 20, 'min': 11, 'points': 4.8},
        '21+': {'min': 21, 'points': 9}
      }
    }, {'metric': 'Result', 'variants': {'complete': {'points': 1.9}, 'incomplete': {'points': 2.1}}}], 'points': 1.7
  },
  'RUSH': {
    'details': [{
      'metric': 'Direction',
      'variants': {'left': {'points': 2.8}, 'middle': {'points': 3.5}, 'right': {'points': 2.8}}
    }, {
      'metric': 'Yards',
      'variants': {
        '3orLess': {'max': 3, 'points': 1.8},
        '4-7': {'max': 7, 'min': 4, 'points': 3.8},
        '8+': {'min': 8, 'points': 5.9}
      }
    }], 'points': 2.5
  }
};
let points = {'direction': 'right guard', 'pass': 0, 'rush': -2, 'yardsGained': 5};
let play = {
  'uid': '-L-DdCRoREVT17o_x255',
  'auto': true,
  'away': {'alias': '', 'score': 0},
  'base': {
    'description': '(9:16) 28-C.Hyde left guard to SF 44 for -2 yards (53-Z.Brown).',
    'penalty': false,
    'safety': false,
    'scoring': false,
    'type': 'RUSH'
  },
  'captured': true,
  'clock': '9:16',
  'endedAt': 1512074332870,
  'eventId': '928c78ac-b62b-4053-9ecf-2bea92da4f9b',
  'eventType': 'play',
  'fulfilled': true,
  'home': {'alias': '', 'score': 0},
  'issued': false,
  'maxPoints': 0,
  'merged': false,
  'processed': true,
  'quarter': 1,
  'rejected': false,
  'situation': {
    'end': {
      'down': 2,
      'isGoal': false,
      'location': 44,
      'locationAlias': 'SF',
      'possessionAlias': 'SF',
      'yards': 12
    },
    'start': {'down': 1, 'isGoal': false, 'location': 46, 'locationAlias': 'SF', 'possessionAlias': 'SF', 'yards': 10}
  },
  'startedAt': 1512074320347
};

function test() {
  let result = Functions.Helpers.getScoredBonusesVariants(play, points, playBonuses);
  console.log(result);
}

test();
