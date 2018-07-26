function calcYards(play) {
  const { start, end, away } = play;

  const away2Absolute = location => 50 - location + 50;
  const startLoc =
    start.locationAlias === away.alias
      ? away2Absolute(start.location)
      : start.location;
  const endLoc =
    end.locationAlias === away.alias
      ? away2Absolute(end.location)
      : end.location;

  let gained = endLoc - startLoc;
  if (start.possession === away.alias) {
    gained *= -1;
  }

  return gained;
}

export default calcYards;
