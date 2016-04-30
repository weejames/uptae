const _ = require('lodash');
const chrono = require('chrono-node');
const config = require('../config');

const msgDefaults = {
  response_type: 'in_channel',
  username: config('BOT_USERNAME'),
  icon_emoji: config('ICON_EMOJI'),
};

const handler = (payload, res) => {
  const msg = _.defaults({
    channel: payload.channel_name
  }, msgDefaults);

  const eventString = payload.text;
  const eventData = chrono.parse(eventString);

  let endDate,
    startDate,
    updatedString;

  if (eventData.length) {
    updatedString = eventString.replace(eventData[0].text, '').trim();

    console.log(eventData);

    if (eventData[0].end === undefined) {
        // same start and end day
        msg.text = 'I\'ve recorded that on ' +
        eventData[0].start.date() +
        ' you\'ll be "' + updatedString + '"';
    } else {
        // multiple dates in range
        msg.text = 'I\'ve recorded that between ' +
        eventData[0].start.date() +
        ' and ' +
        eventData[0].end.date() +
        ' you\'ll be "' + updatedString + '"';
    }

  } else {
    if (eventString.length) {
        msg.text = 'Sorry - I couldn\'t figure out what you meant by "' + eventString + '"';
    } else {
        msg.text = 'Use `@uptae help` for instructions on use.';
    }
  }

  res.set('content-type', 'application/json');
  res.status(200).json(msg);
  return;
};

module.exports = { pattern: /./ig, handler };
