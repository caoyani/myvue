const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const request = require('request')
const baseConfig = require('./src/api/config.js')


app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "Content-Type,username");
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//////////////////////////////////////////////////////////////////////////////////////
const ldap = require("ldapjs");
const fs = require("fs");

app.use(bodyParser.json())
app.use(express.static('dist'))
app.use(morgan('combined')) // We want to log all HTTP requests


app.get('/', function(req, res){
    res.send('Hello World');
})



app.post('/ldapAuth', (httpReq, httpRes) => {
    var response = {};

    // create LDAP client
    let client = ldap.createClient({
        url: 'LDAPS://ldapServerHostIP:3269',
        // reconnect: true,
        tlsOptions: {
            rejectUnauthorized: true,
            ca: [fs.readFileSync(__dirname + '/src/assets/CA.cer', 'utf-8')]
        }
    });

    const staffId = httpReq.body.name;
    const staffPassword = httpReq.body.pass;

    if (staffId != "" && staffPassword != "") {
        client.bind('CN=' + staffId + ',OU=ABCDPeople,DC=InfoDir,DC=Prod,DC=ABCD', staffPassword, function (err1, res1) {
            if (err1 != null) {
                console.log("------bind--err1---++++----" + err1);
                response.result = false
                client.unbind(err =>{ });
                httpRes.end(JSON.stringify(response));
            } else if (res1 == undefined) {
                console.log("-----res1---undefined---++++----" + res1);
                client.unbind(); //only unbind when bind successfully
                response.result = false
                httpRes.end(JSON.stringify(response));
            } else {
                let opts = {
                    filter: '(&(|(objectClass=userproxy)(objectClass=user))(|(employID=' + staffId + ')(abcd-ad-SAMAccountName=' + staffId + ')))',
                    scope: 'sub',
                    timeLimit: 500
                };
                client.search('DC=InfoDir,DC=Prod,DC=ABCD', opts, function (err2, res2) {
                    if (err2 != null) {
                        console.log("----------search err2---------" + err2);
                        client.unbind(); //only unbind when bind successfully
                        response.result = false
                        httpRes.end(JSON.stringify(response));
                    }
                    res2.on('searchEntry', function (entry) {
                        console.log("searchEntry------------");
                        // let dn = entry.dn; //CN=starfId,OU=ABCDPeople,DC=InfoDir,DC=Prod,DC=ABCD
                        // console.log("dn:" + dn);
                        let name = entry.object.displayName; //displayName
                        let mail = entry.object.mail; //mail
                        let mailAddress = entry.object.mailAddress; //mailAddress
                        let token = entry.object.objectSid;
                        let department = entry.object.department;

                        response.name = name;
                        response.mail = mail;
                        response.mailAddress = mailAddress;
                        response.token = token;
                        response.result = true;
                        response.department = department;

                        // if (department == "INSURANCE") {
                        //     response.result = true;
                        // } else {
                        //     response.result = false;
                        // }

                        console.log("name:" + name);
                        console.log("mail:" + mail);
                        console.log("mailAddress:" + mailAddress);
                        // let user = entry.object;
                        // let userText = JSON.stringify(user, null, 2);
                        // console.log("userText:" + userText);
                        console.log("searchEntry response---------------" + JSON.stringify(response));
                        client.unbind(err => { });
                        httpRes.end(JSON.stringify(response));
                    });
                    res2.on('searchReference', function (referral) {
                        console.log("searchReference------------");
                        console.log('referral' + referral.uris.join());
                        response.result = false
                        client.unbind(); //only unbind when bind successfully
                        httpRes.end(JSON.stringify(response));
                    });
                    res2.on('error', function (err) {
                        console.log("error------------");
                        console.error('error' + err.message);
                        client.unbind();
                        response.result = false
                        httpRes.end(JSON.stringify(response));
                    });
                });
                // console.log("ladp------------connect successfully");
            }
        });
    } else {
        response.result = false
        console.log("response::::::::::::::;" + JSON.stringify(response));
        httpRes.end(JSON.stringify(response));
    }
    // console.log("response------------response successfully");
})

app.listen(baseConfig.basePort, baseConfig.baseHost)
console.log('Server is listening to port 8000' + baseConfig.basePorts)
// app.listen(8000)
// console.log('Server is listening to port 8000')


