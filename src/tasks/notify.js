const _ = require('lodash');
const config = require('../config');
const Botkit = require('botkit');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const msgDefaults = {
  response_type: 'in_channel',
  username: config('BOT_USERNAME'),
  icon_emoji: config('ICON_EMOJI'),
};

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({
  url: config('WEBHOOK_URL'),
});

const attachments = [];

// read out todays uptaes from the database
// need to abstract this so it can do a specific date
pg.connect(process.env.DATABASE_URL, (err, client) => {
  if (err) throw err;

  console.log('Connected to db! Getting entries...');

  client
        .query('SELECT * FROM entries WHERE action_date = CURRENT_DATE')
        .on('row', (row) => {
          attachments.push({
            title: `${row.user_name}:`,
            text: `${row.action}`,
          });
        })
        .on('end', () => {
          client.end();

          if (attachments) {
            const msg = _.defaults({ attachments }, msgDefaults);

            bot.sendWebhook(msg, (err, res) => {
              if (err) throw err;
            });
          }
        });
});
