var express = require('express');
var app = express();
//set port
var port = process.env.PORT || 8080

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');



// app.use(express.static(__dirname));
app.use(express.static('dist'));

// routes

app.get("/", function(req, res) {
	res.render("index");
});



app.listen(port, () => {
	console.log('Nutrition Tracker App is running.')
});