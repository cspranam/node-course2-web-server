const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}:${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n', (err)=>{
		if(err){
			console.log('Error:',err);
		}
	});
	next();
});

// app.use((req, resp, next) =>{
	// resp.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.get('/',(req, resp) => {
	resp.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'welcome to Home Page'
	});
});

app.get('/about', (req,resp) => {
	resp.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req,resp) => {
	resp.send({errorMessage:'Invalid end point'});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});