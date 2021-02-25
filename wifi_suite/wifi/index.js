
const os = require('os');
const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const bodyParser = require("body-parser");
const { Hash } = require('crypto');

let ssid = ''
let pswd = ''

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  let texte = 'Hello World!- Veuillez rentrer les infos wifi comme suit --> http://registerwifi.art/go?ssid=myssid&pswd=mypswd';
  res.send(texte);
})

// ----------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
app.get('/go', (req, res,) => {
    ssid = String(req.query.ssid)
    pswd = String(req.query.pswd)
    console.log(`SSID : ${ssid} <----> PASSWORD : ${pswd}`)
    ecriture(ssid,pswd,'file1');
    test_fichiers(ssid,pswd)
    res.send("Merci c'est enregistré !!")
  })

function ecriture(ssid,pswd,path) {
    if (ssid != '' & pswd != '')
    {
        fs.writeFile(path, ssid.concat(' ', pswd), function (err) {
            if (err) return console.log(err);
            console.log('Ecriture ... -> ', path);
        });
    }
 }