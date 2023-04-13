const mysql     = require('mysql');
const express   = require('express');
const app = express();
const server = require ('http').createServer(app);
const path = require('path');

server.listen(3000, ()=>{
  console.log('Server Listening on Port %d', 3000);
});

app.get('/', function (req, res){
  res.sendFile(__dirname + "/pages/login/login.html");
});

app.use(express.static('pages'));

app.get('/createuser', function (req, res){
  res.sendFile(__dirname + "/pages/createuser/createuser.html")
});

app.get('/get-data', function (req, res){
  res.send('Hello World');
});
/*

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'as*fNf83#Udab83!D',
  database : 'users'
});

connection.connect();

connection.query("SELECT * FROM users where username= 'Dasumma1'", function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].hash);
});
 
connection.end();
*/