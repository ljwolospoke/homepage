var express = require('express');
var fortune = require("./fortune");

var app = express();

var fortunes = [
        "conquer your fears or they will conquer you.",
        "River need springs.",
        "Do not fear what you don't know.",
        "you will have a pleasant suprise.",
        "whenever possible, keep it simple.",
];
// set up handlebars
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();
});

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.render('home');
});

app.get('/game', function(req, res){
	res.render('game');
});

app.get('/about', function(req, res){
	res.render("about", { fortune: fortune.getFortune(),
         pageTestScript: '/qa/tests-about.js' });
	//res.render('about', {
	//	pageTestScript: '/qa/tests-about.js'
});

//cross testing
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

// 404 page
app.use(function(req, res, next){
	res.status(404)
	res.render('404')
});

// 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'), function(){
 console.log( 'Express started on host:' + app.get('port') + '; press ctrl-c to terminate.');
});
	
