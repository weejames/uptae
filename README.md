# Uptae

[![Twitter: @weejames](https://img.shields.io/badge/contact-@weejames-blue.svg?style=flat)](https://twitter.com/weejames)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Uptae is a Slackbot that you and your team can use to let each other know what you're upto.

Stuck in meetings all day? Out of the Office?  On holiday? Tell Uptae and it'll let everyone know.

## Installation

Uptae is designed to be installed directly on to Heroku as a Heroku app.  It requires a web server and a Postegres DB server.

*Note:* If you're running Uptae on the Heroku free tier then the web server will go to sleep after 30 minutes of inactivity.  If you're using Uptae regularly throughout the day then you'll be fine, but if no one interacts with it for 30 minutes then the first command will likely see a Timeout error while it starts up.

### Requirements

You'll need need a Slack team and the ability to [set up custom integrations](https://slack.com/apps/manage/custom-integrations).

As part of installation you'll set up:

1. Incoming Slack web hook for Uptae to post messages
2. Outgoing Slack web hook to allow Uptae to receive messages

### Environment Variables

`BOT_USERNAME` The name you'd like the Bot to use when communicating with your Slack team (Defaults to: Uptae)
`BOT_COMMAND_TOKEN` From Slack Web Integrations page
`SLACK_TOKEN` ??
`WEBHOOK_URL` URL of your Slack domain?

### Configure Notifications

Uptae will send a message to your configured channel

## Using Uptae

### Adding an entry

**Note:** If you already have an entry for a date, and you specify another entry for that date, the original will be overwritten.  No history, or backup of the original entry is maintained.

### Seeing your existing entries

_Coming soon_

### Deleting an entry

_Coming soon_

### Creating an entry for someone else

_Coming soon_

When you create an entry for someone else they will be notified directly by Uptae.

### Daily Notifications

If you've configured the Notifications from Uptae, then each day it will post a message to your chosen channel detailing all of the entries for today and for tomorrow.

### Getting Help

Once Uptae is in one of your channels you can get a reminder of all of the supported operations using `/uptae help`.
