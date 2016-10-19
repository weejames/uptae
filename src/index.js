const bodyParser = require('body-parser');
const express = require('express');
const proxy = require('express-http-proxy');
const _ = require('lodash');
const url = require('url');
const bot = require('./bot');
const config = require('./config');
const commands = require('./commands');
const defaultCommand = require('./commands/default');

const app = express();

if (config('PROXY_URI')) {
  app.use(
        proxy(
            config('PROXY_URI'), {
              forwardPath: req => url.parse(req.url).path,
            }
        )
    );
}

app.use(
    bodyParser.json()
);

app.use(
    bodyParser.urlencoded({ extended: true })
);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/commands', (req, res) => {
  const payload = req.body;

  if (_.isEmpty(payload)) {
    const err = 'No data provided';

    res.status(500).end(err);
    return;
  }

    // we check a valid token has been provided in the payload
  if (payload.token !== config('SLACK_TOKEN')) {
    const err = 'An invalid token was provided. Is your Slack slash token correctly configured?';

    res.status(401).end(err);
    return;
  }

  const commandHandler = _.reduce(
        commands,
        (a, cmd) => (payload.text.match(cmd.pattern) ? cmd : a),
        defaultCommand
    );

  commandHandler.handler(payload, res);
});

app.listen(config('PORT'), (err) => {
  if (err) throw err;

  if (config('SLACK_TOKEN')) {
    bot.listen({ token: config('SLACK_TOKEN') });
  }
});
