const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//Connect to dbms
mongoose.connect('mongodb+srv://user_0:papponi312@cluster0-vq45a.mongodb.net/profDB', { useUnifiedTopology: true, useNewUrlParser: true });

//Get Models
require('./models/professor-model');

const port = process.env.PORT || 3000;

//Get Controllers
const profController = require('./controllers/professor-controller');

const app = express();

// const bodyParser = require('body-parser');

//Define Path
const viewsPath = path.join(__dirname, './views');

app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(express.json());

//fire controller
app.use(profController);

//set up views engine
app.set('view engine', 'hbs');

//set views path
app.set('views', viewsPath);

//static files
app.use(express.static('./utils'));

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

/*==============================================================================================================*/
app.listen(port, () => {
	console.log('Server up at port', port);
});
