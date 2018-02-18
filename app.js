var express = require('express');
var app = express();
var quizControler = require('./controllers/quizController');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
quizControler(app);
app.listen(3000);
console.log('server is running');