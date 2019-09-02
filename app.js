const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tranhieu07:Lyco2015!@hieu-reviews-atlas-cluster-d1jyv.mongodb.net/nutrition-tracker?retryWrites=true', { useNewUrlParser: true }).then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log('Not Connected to Database ERROR!', err);
});

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
	title: String
});

const users = mongoose.model('user', userSchema);


//set port
var port = process.env.PORT || 8080

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');



// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/dist'));

// routes

app.get("/", function(req, res) {
	res.render("index");
});

app.listen(port, () => {
	console.log('Nutrition Tracker App is running.')
});