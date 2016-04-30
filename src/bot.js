const slack = require('slack');
const _ = require('lodash');
const config = require('./config');

const bot = slack.rtm.client();

bot.started((payload) => {
  this.self = payload.self;
});

bot.message((msg) => {
  if (!msg.user) return;

  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return;

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: 'Uptae',
    text: 'beep boop: I hear you loud and clear!"',
  }, (err) => {
    if (err) throw err;
  });
});

module.exports = bot;
