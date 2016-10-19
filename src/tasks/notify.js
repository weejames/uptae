const _ = require('lodash');
const config = require('../config');
const Botkit = require('botkit');
const knexConfig = require('../../knexfile.js');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

const msgDefaults = {
  response_type: 'in_channel',
  icon_emoji: config('ICON_EMOJI'),
};

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({
  url: config('WEBHOOK_URL'),
});

const attachments = [];

knex('entries')
    .select()
    .whereRaw('action_date = DATE \'today\' OR action_date = DATE \'tomorrow\'')
    .orderBy('action_date')
    .then( function (data) {

        data.forEach( function (row) {
            attachments.push({
              title: `${row.user_name}:`,
              text: `${row.action}`,
            });
        });

        if (attachments) {
          const msg = _.defaults({ attachments }, msgDefaults);

          bot.sendWebhook(msg, (err, res) => {
            if (err) throw err;
          });
        }
        return knex.destroy();
    });
