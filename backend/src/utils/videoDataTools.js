
function getVideoDuraion(youTubeVideoDuration) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let duration = youTubeVideoDuration.replace('PT', '');

  if (duration.indexOf('H') > -1) {
    let hours_split = duration.split('H');
    hours = parseInt(hours_split[0]);
    duration = hours_split[1];
  }

  if (duration.indexOf('M') > -1) {
    let minutes_split = duration.split('M');
    minutes = parseInt(minutes_split[0]);
    duration = minutes_split[1];
  }

  if (duration.indexOf('S') > -1) {
    let seconds_split = duration.split('S');
    seconds = parseInt(seconds_split[0]);
  }

  return secondsToMinutes((hours * 60 * 60) + (minutes * 60) + (seconds));
}

function secondsToMinutes(s) { return Number((s - (s %= 60)) / 60 + (9 < s ? '.' : '.') + s) }

module.exports = { secondsToMinutes, getVideoDuraion };