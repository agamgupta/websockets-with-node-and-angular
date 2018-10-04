// Getting all the required packages
const express = require('express');
const app = express()
const server = require('http').createServer(app); //NEW
const io = require('socket.io')(server) // NEW
const bodyParser = require('body-parser')
const port = process.env.PORT || 8085; // as heroku assigns port's dynamically so we just capture them here

const name = "Agam";
var newName;
var showNoShow;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// Static files
app.use(express.static(__dirname + '/public')); // To be able to return static objects - such as images, html, js files kept locally


// Socket logic NEW---------

io.on('connection', socket => {
    console.log('creating a new socket');
    
    socket.join('room1');
    // io.sockets.in('room1').emit('rfidData', {name: newName, showVal: showNoShow});

    socket.on('disconnect', () => {
        console.log('deleting socket');
    });
    
});

//--------------------
// Defining the main route on the app to basically test if everything is working
app.get('/', (req, res) => {
    console.log("get req made");
	res.send("Hi welcome to the homepage")
});

app.get('/name', (req,res) => {
    res.send({nameVal: newName, showVal:showNoShow})
});

// when I get a post request, I post to my socket
app.post('/name', (req,res) => {
    newName = req.body.name;
    showNoShow = JSON.parse(req.body.show);
    // socket.join('room1');
    io.sockets.in('room1').emit('rfidData', {name: newName, showVal: showNoShow});
    res.send("Thanks, see your response on angular")
})

// Listening on the designated port
server.listen(port); // updated!!!!!
console.log('The app just started running, please head over to postman to make requests');
