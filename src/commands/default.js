const _ = require('lodash');
const chrono = require('chrono-node');
const config = require('../config');

const knexConfig = require('../../knexfile.js');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);
const moment = require('moment');

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
    entries = [],
    startDate,
    updatedString;

  if (eventData.length) {
    updatedString = eventString.replace(eventData[0].text, '').trim();

    if (eventData[0].end === undefined) {
        // same start and end day
        msg.text = 'I\'ve recorded that on ' +
        moment(eventData[0].start.date()).format('MMMM Do') +
        ' you\'ll be "' + updatedString + '"';

        entries.push({
            action_date: eventData[0].start.date(),
            action: updatedString,
            user_name: payload.user
        });


    } else {
        // multiple dates in range
        msg.text = 'I\'ve recorded that between ' +
        moment(eventData[0].start.date()).format('MMMM Do') +
        ' and ' +
        moment(eventData[0].end.date()).format('MMMM Do') +
        ' you\'ll be "' + updatedString + '"';

        let startDate = eventData[0].start.date();
        let endDate = eventData[0].end.date();

        endDate = endDate.setDate(endDate.getDate() + 1);

        while(startDate < endDate){
            entries.push({
                action_date: startDate,
                action: updatedString,
                user_name: payload.user
            });

            let newDate = startDate.setDate(startDate.getDate() + 1);
            startDate = new Date(newDate);
        }
    }

    knex('entries').insert(
        entries
    ).then();

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
