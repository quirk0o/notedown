'use strict'

import google from 'googleapis'
import config from '../config/environment'

const OAuth2 = google.auth.OAuth2;
let oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);

const drive = google.drive({ version: 'v3', auth: oauth2Client });

export function upload(req, res) {
  oauth2Client.setCredentials({ access_token: req.session.accessToken });

  drive.files.create({
    resource: {
      name: req.body.title,
      mimeType: 'text/plain'
    },
    media: {
      mimeType: 'text/plain',
      body: req.body.content
    }
  }, (err, response) => {
    if (err) {
      let statusCode = response.status || 500;
      res.status(statusCode).send(err);
    } else {
      let statusCode = response.status || 200;
      res.status(statusCode).send();
    }
  });
}
