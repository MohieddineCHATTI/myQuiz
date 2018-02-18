var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});


mongoose.connect('mongodb://quizUser:quizUser@ds239988.mlab.com:39988/qst-data-base');

var questionSchema = new mongoose.Schema({
    qstEn: String,
    qstFr: String,
    opt1En: String,
    opt1Fr: String,
    opt2En: String,
    opt2Fr: String,
    opt3En: String,
    opt3Fr: String,
    opt4En: String,
    opt4Fr: String,
    correctEn: String,
    correctFr: String,
    qstImage: String,
    descEn: String,
    descFr: String,
    major: String,
    dif: String
} );

    var Qst = mongoose.model('qst', questionSchema);

module.exports = (function(app){
    
  app.get('/quiz', function(req, res){
           res.render('quiz');
       });
 

    
    app.post('/qstDataBase',urlencodedParser, function(req, res){
        var allQst;
        var majors = req.body.majors;
        var lang = req.body.lang;
        // getting data base and storing it in a variable -allQst
       Qst.find({}, function(err, data){
           if (err) throw err;
           allQst = data;
           
       })
   }); 
    
    
   app.post('/quiz', urlencodedParser, function(req, res){
       var newQst = Qst(req.body).save(function(err,data){
         if (err) throw err;
        res.json(data);
       });
       }); 
    
    
    
   app.get('/quiz', function(req, res){
       
   }); 
    
});










