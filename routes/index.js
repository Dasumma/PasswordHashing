var express = require('express');
var crypto = require ('crypto');
var md5 = require('md5');
var lfsr = require('lfsr');
var router = express.Router();

var database = require('../database');
const LFSR = require('lfsr');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.get('/createaccount', function(req, res, next) {
    res.render('createaccount', { title: 'Express', session : req.session});
});

router.post('/register', function(request, response, next){

    let user_email_address = request.body.user_email_address;
    let user_password = request.body.user_password;
    let hash = crypto.randomBytes(10).toString('hex');
    user_password = hash + user_password;

    if(!(user_email_address && user_password)){
        response.send("Please enter Email Address and Password Details");
        response.end();
        return;
    }
    let query = `
    Select * FROM USER_LOGIN
    WHERE USER_UNAME =  "${user_email_address}"
    `;
    let insert = `
    INSERT INTO USER_LOGIN (USER_UNAME, USER_PSW, USER_HASH)
    VALUES ("${user_email_address}", "${user_password}", "${hash}")
    `

    database.query(query, function(error, data){  
        if(data.length > 0){
            response.send('Email address already in use');
            response.end();
            return;
        }
        request.session.acc_created = true;
        database.query(insert);
        response.redirect("/");
    });
});

router.post('/login', function(request, response, next){

    let user_email_address = request.body.user_email_address;
    let user_password = request.body.user_password;


    if(!(user_email_address && user_password)){
        response.send('Please Enter Email Address and Password Details');
        response.end();
        return;
    }

    let query = `
    SELECT * FROM USER_LOGIN 
    WHERE USER_UNAME = "${user_email_address}"
    `;
    database.query(query, function(error, data){
        if(data.length <= 0){
            response.send('Incorrect Email Address');
            response.end();
            return;
        }
        let user_hash = data[0].USER_HASH;
        if(data[0].USER_PSW != (user_hash + user_password)){
            response.send('Incorrect Password');
            response.end();
            return;
        }
        request.session.user_id = data[0].USER_ID;
        request.session.user_uname = user_email_address;
        response.redirect("/");
    });
});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;

