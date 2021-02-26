


const os = require('os');
const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const sha1File = require('sha1-file'); 
const bodyParser = require("body-parser");


let ssid = ''
let pswd = ''

app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json())

app.get('/html', function(req, res) {
    res.render('testsage.ejs');
});

//!!!!!!!!!!!!!!!!! IL FAUT METTRE LA VARIABLE address comme ip pour la raspi !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const tab = os.networkInterfaces()
const address = tab["wlan0"][0]["address"]
/*
app.get('/', (req, res) => {
  let texte = 'Hello World!- Veuillez rentrer les infos wifi comme suit --> http://registerwifi.art/go?ssid=myssid&pswd=mypswd';
  res.send(texte);
})*/
//Mon adresse ip 

//console.log(os.networkInterfaces)

// ----------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
app.post('/html', (req, res,) => {
  console.log(req.body);
  console.log(`SSID : ${req.body.ssid} <----> PASSWORD : ${req.body.password}`)
  ssid = String(req.body.ssid), //automatic filling of current user
	password = String(req.body.password),
    ecriture(ssid,password,'wifi_info_tmp.txt');
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



// Step 8 - the POST handler for processing the uploaded file

// Step 9 - configure the server's port

