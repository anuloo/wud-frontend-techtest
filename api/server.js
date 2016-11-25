var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
var cache;

function read() {
  return JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf8'));
}

function write() {
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(cache));
}

app.listen(8000);

app.get('/users', function(req, res) {
  console.log('GET /users');
  cache = read();
  res.json(cache.users);
});

//select record api works tested with postman,  not been used on the front end 
app.get('/users/:id', function(req, res) {
  var id = req.params.id;
  
  cache = read();
  var user = null;
 
 for (var userid in cache.users){
   if( cache.users[userid].id == id){
     user = cache.users[userid];
     console.log('c/users/:id=  ' + user.id);
   }
 }
  res.json(user);
});

app.post('/user', function(req, res) {
  cache = read();
  console.log('POST /user');
  console.log(req.body);
  var user = req.body;
  var validation = {
    firstname: "string",
    lastname: "string",
    email: "string"
  };
  for (var field in validation) {
    var type = typeof user[field];
    if (!user.hasOwnProperty(field)) {
      res.status(400);
      res.send(`Field '${field}' is required`);
      return;
    }
    else if (type !== validation[field]) {
      res.status(400);
      res.send(`Field '${field}' must be of type '${validation[field]}'.`);
      return;
    }
  }
  user.id = cache.users.length;
  cache.users.push({
    id: cache.users.length,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  });
  write();

  res.status(200);
  res.send();
});
