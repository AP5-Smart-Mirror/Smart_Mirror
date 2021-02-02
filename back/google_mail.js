var fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/* // Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listLabels);
}); */

let messages_list = {};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = await new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  await fs.readFile(TOKEN_PATH, async (err, token) => {
    if (err) return await getNewToken(oAuth2Client, callback);
    await oAuth2Client.setCredentials(JSON.parse(token));
    await callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getNewToken(oAuth2Client, callback) {
  const authUrl = await oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = await readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', async (code) => {
    await rl.close();
    oAuth2Client.getToken(code, async (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      await oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      await fs.writeFile(TOKEN_PATH, JSON.stringify(token),async (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      await callback(oAuth2Client);
    });
  });
}

/**
 * Lists the messages in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  await gmail.users.messages.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const messages = res.data.messages;
    if (messages.length) {
      console.log('Labels:');
      //console.log(messages);


      /*messages.forEach((message) => {
        console.log(`- ${message.name}`);
      });*/

      

      messages.forEach((message) => {
        console.log(jsonTreatment(getMailProm('me', message.id)));
      });
    } else {
      console.log('No messages found.');
    }
  });
}

function getMailProm(userId, id){
  const url = `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${id}`;
  console.log(id);
  return new Promise((success, failure) => {
    fetch(url, 
      {
        snippet : "message",
        payload : {
          headers : [
            {
              "name" : "From"
            },
            {
              "name" : "Subject"
            },
            {
              "name" : "Date"
            }
          ]
        }
      })
      .then(response => {
        success(response.json());
      })
      .catch(err => console.error(err));
  })
}

function jsonTreatment(json){
  var messages = {};
  console.log(json);
  for (var i = 0; i < json.length; i++){
    var message = {};
    /*message["snippet"] = json[i].snippet;
    message["date"] = json[i].internalDate;
    message["message"] = json[i].raw;
    messages.push(message);*/

    message["expeditor"] = json[i].From;
    message["subject"] = json[i].Subject
    message["sentDate"] = json[i].Date;
    message["message"] = json[i].Message;
    messages.push(message);
  }

  return messages;
}



async function getMail(){
  await fs.readFile('credentials.json', async (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    await authorize(JSON.parse(content), await listLabels);
  });
  console.log(messages_list);
  return messages_list;
  //return jsonTreatment(messages_list);
}

exports.getMail = getMail;