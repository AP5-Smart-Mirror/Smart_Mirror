const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';

let messages_list = [];

async function authorize(credentials, callback) {
  messages_list = [];
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = await new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
      );

  // Check if we have previously stored a token.
  await fs.readFile(TOKEN_PATH, async (err, token) => {
    if (err) {
      return await getNewToken(oAuth2Client, callback);
    }
    await oAuth2Client.setCredentials(JSON.parse(token));
    await callback(oAuth2Client);             // changer le nom de la fonction
  });
}

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
      if (err) {
        return console.error('Error retrieving access token', err);
      }
      await oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      await fs.writeFile(TOKEN_PATH, JSON.stringify(token),async (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Token stored to', TOKEN_PATH);
      });
      await callback(oAuth2Client); //changer le nom de la fonction
    });
  });
}

async function listUnreadMails(auth,) {
  const gmail = google.gmail({version: 'v1', auth});
  await gmail.users.messages.list({
    userId: 'me',
    labelIds: [
      "UNREAD"                    // creer une variable labelIds pour supprimer fct listStarredMails
    ],
    "maxResult" : 5
  }, async (err, res) => {
    if (err) {
      return console.error('The API returned an error: ' + err);
    }
    const messages = res.data.messages;
    if(typeof messages != 'undefined'){
      if (messages.length) {
        messages.forEach(async (message) => {
          await getMailProm(auth, message.id);
        });
      } 
    } else {
      console.log('No unread messages found.'); // return an error message in the json

    }
  });
}

async function listStarredMails(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  await gmail.users.messages.list({
    userId: 'me',
    labelIds: [
      "STARRED"
    ],
    "maxResult" : 5
  }, async (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const messages = res.data.messages;
    if(typeof messages != 'undefined'){
      if (messages.length) {
        let cpt = 0;
        messages.forEach(async (message) => {
          await getMailProm(auth, message.id);
          cpt += 1;
        });
      }
    } else {
      console.log('No starred messages found.');
    }
  });
}

async function getMailProm(auth, id){ // nom de fonction à changer
  let newMessage = {};
  const gmail = google.gmail({version: 'v1', auth});
  await gmail.users.messages.get({
    "userId": "me",
    "id": id,
  }, (err, res) => {
  if (err) {
    return console.log('The API returned an error: ' + err);
  }
  const message = res.data.payload.headers;
  if (res.data.labelIds.includes('UNREAD')){ // a revoir pour simplifier ex parametre de la fonction pour le labelids
    newMessage["label"] = "Non Lu : ";
  }
  if (res.data.labelIds.includes('STARRED')){
    newMessage["label"] = "Suivi : ";
  } 
  newMessage["message"] = res.data.snippet;
      message.forEach(async header => {
        switch (header.name){
          case 'From' : 
            newMessage["sender"] = header.value;
          break;
          case 'Date' :
            newMessage["date"] = header.value;
          break;
          case 'Subject' :
            newMessage["object"] = header.value;
          break;
        }
      })
      messages_list.push(newMessage);
  })
}

async function getMail(){
  await fs.readFile('credentials.json', async (err, content) => {
    if (err) {
      return console.error('Error loading client secret file:', err);
    }
    // Authorize a client with credentials, then call the Gmail API.
    await authorize(JSON.parse(content), await listUnreadMails);
    await authorize(JSON.parse(content), await listStarredMails);
  });
  return messages_list;
}

exports.getMail = getMail;
