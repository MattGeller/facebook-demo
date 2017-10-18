//express is prewritten code that makes a webserver for you
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const {resolve} = require('path');
const passport = require('passport');
//this is like creating the $_POST superglobal for node to use
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const io = require('socket.io')();

//proccess.env is for environment variables. Environment variables are like SUPER superglobals, for the whole machine!

const PORT = process.env.PORT || 5000;

require('./models/user');
require('./services/passport');

//express() essentially returns a web server for us to use
const app = express();




mongoose.connect(keys.mogo_db, /*this object literal should get rid of all those deprecation warnings*/ {
    useMongoClient: true
});

//.use() creates some middleware. all of our requests will run though the function we put here (bodyParser.json() probably returns a function)
app.use(bodyParser.json());

app.use(
    cookieSession({
        //30 days but expressed in milliseconds
        maxAge: 30*24*60*1000,
        //uses this string to encrypt AND decrypt
        keys: [keys.cookie_key]
    })
);

//allow passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

//return a function, so we can directly invoke it
require('./routes/auth_routes')(app);

//get websocket ready and listening
io.on('connection', socket =>{
    console.log('A USER CONNECTED');

    socket.on('disconnect',  () => {
        console.log('A USER LEFT');
    });

    socket.on('chat message', msg => {
        console.log('From Client Message:', msg);
        io.emit('chat message', msg);
    })

});

io.listen(3500);

//these next two statements are to tell express to send static files, ie don't do processing on them or anything, just send them straight to the client
app.use(express.static(resolve(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist','index.html'))
});

//tell the web server to start itself and listen in that particular place.
app.listen(PORT, () => {
    console.log('Server running at localhost:' + PORT);
});