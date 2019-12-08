const express = require('express');
var http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');

const app = express();

//socket
const server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
		console.log('message: ' + msg);
	});
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

//Connect to dbms
mongoose.connect('mongodb+srv://user_0:papponi312@cluster0-vq45a.mongodb.net/profDB', { useUnifiedTopology: true, useNewUrlParser: true });

//Get Models
require('./models/professor-model');
require('./models/comment-model');

const port = process.env.PORT || 3000;

//Get Controllers
const profController = require('./controllers/professor-controller');
const commentController = require('./controllers/comment-controller');

// const bodyParser = require('body-parser');

//Define Path
const viewsPath = path.join(__dirname, './views');
const partialsPath = path.join(__dirname, './views/partials');

app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(express.json());

//fire controller
app.use(profController);
app.use(commentController);

//set up views engine
app.set('view engine', 'hbs');

//set views path
app.set('views', viewsPath);

//static files
app.use(express.static('./utils'));

//register Partials
hbs.registerPartials(partialsPath);

//general routes
app.get('/home', (req, res) => {
	res.render('index');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/input_prof_info', (req, res) => {
	res.render('input_prof_info');
});

app.get('/review', (req, res) => {
	res.render('reviewPage');
});

/*==============================================================================================================*/
server.listen(port, () => {
	console.log('Server up at port', port);
});
