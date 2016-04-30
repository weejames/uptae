

const _ = require('lodash');
const config = require('../config');

const msgDefaults = {
  response_type: 'in_channel',
  username: config('BOT_USERNAME'),
  icon_emoji: config('ICON_EMOJI'),
};

const attachments = [
  {
    title: 'Configuring Uptae',
    color: '#E3E4E6',
    text: '`/uptae help`: This help screen\n`' +
        '/uptae [date] [action]`: Set what you\'re update on a specific date\n' +
        '/uptae me`: See what you\'ve said you\'re doing\n' +
        '/uptae @username`: See what a specific user has said they\'re doing\n',
    mrkdwn_in: ['text'],
  },
];

const handler = (payload, res) => {
  const msg = _.defaults({
    channel: payload.channel_name,
    attachments,
  }, msgDefaults);

  res.set('content-type', 'application/json');
  res.status(200).json(msg);
  return;
};

module.exports = { pattern: /help/ig, handler };
