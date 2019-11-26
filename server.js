const express = require('express');
const mongoose = require('mongoose');

//Connect to dbms
mongoose.connect('mongodb+srv://user_0:papponi312@cluster0-vq45a.mongodb.net/profDB', { useUnifiedTopology: true, useNewUrlParser: true });

//Get Models

const port = process.env.PORT || 3000;

//Get Controllers

const app = express();

// const bodyParser = require('body-parser');

app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(express.json());

//fire controller
app.use();

//set up template
app.set('view engine', 'hbs');

//static files
app.use(express.static('./utils'));

/*==============================================================================================================*/
app.listen(port, () => {
	console.log('Server up at port', port);
});
