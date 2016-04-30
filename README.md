# Uptae

[![Twitter: @weejames](https://img.shields.io/badge/contact-@weejames-blue.svg?style=flat)](https://twitter.com/weejames)

Uptae is a Slackbot that you and your team can use to let each other know what you're upto.

Stuck in meetings all day? Out of the Office?  On holiday? Tell Uptae and it'll let everyone know.

## Installation

Uptae is designed to be installed directly on to Heroku as a Heroku app.  It requires a web server and a Postegres DB server.

*Note:* If you're running Uptae on the Heroku free tier then the web server will go to sleep after 30 minutes of inactivity.  If you're using Uptae regularly throughout the day then you'll be fine, but if no one interacts with it for 30 minutes then the first command will likely see a Timeout error while it starts up.
