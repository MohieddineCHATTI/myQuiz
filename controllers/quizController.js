var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});


mongoose.connect('mongodb://quizuser:quizuser@ds247678.mlab.com:47678/quiz-data-base');

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
});
var scoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
    country: String,
    wrongAns: Number,
    correctAns: Number,
    major: String
});
var Qst = mongoose.model('qst', questionSchema);
var Score = mongoose.model('score', scoreSchema)
module.exports = (function (app) {
    var filtredEasyQst = [],
        filtredMediumQst = [],
        filtredHardQst = [];
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/quiz', function (req, res) {
        res.render('quiz', {
            data: req.query
        });

    });

    app.post('/qstDataBase', urlencodedParser, function (req, res) {
        var allQst;
        var allFiltredQst = [];
        var majors = req.body.majors;
        var lang = req.body.lang;
        console.log(lang);
        console.log(majors);


        // getting data base and storing it in a variable -allQst
        Qst.find({}, function (err, data) {
            if (err) throw err;
            allQst = data;
            //console.log(majors);
            filtredEasyQst = allQst.filter(qst => majors.includes(qst.major) && qst.dif == 'easy');
            // console.log(filtredEasyQst);
            filtredMediumQst = allQst.filter(qst => majors.includes(qst.major) && qst.dif == 'medium');
            // console.log(filtredMediumQst);
            filtredHardQst = allQst.filter(qst => majors.includes(qst.major) && qst.dif == 'hard');
            //console.log(filtredHardQst);
        }).then(randomQstGenerator).then(function () {
            res.send(allFiltredQst);
        });
        // choose random qst from filtred qst
        function randomQstGenerator() {
            var index = 0,
                easyIndex = [],
                mediumIndex = [],
                hardIndex = [],
                j;

            do {
                // console.log('doing');
                if (index < 4) {
                    j = Math.floor(Math.random() * filtredEasyQst.length);
                    if (!easyIndex.includes(j)) {
                        allFiltredQst.push(filtredEasyQst[j]);
                        easyIndex.push(j);
                        console.log("index is" + index);
                        console.log("j is" + j);
                        index++;
                    }

                }

                if (index > 3 && index < 10) {
                    j = Math.floor(Math.random() * filtredMediumQst.length);
                    if (!mediumIndex.includes(j)) {
                        allFiltredQst.push(filtredMediumQst[j]);
                        mediumIndex.push(j);
                        index++;
                    }
                }

                if (index > 9 && index < 15) {
                    j = Math.floor(Math.random() * filtredHardQst.length);
                    if (!hardIndex.includes(j)) {
                        allFiltredQst.push(filtredHardQst[j]);
                        hardIndex.push(j);
                        index++;
                    }
                }

            } while (index < 15);

            console.log(allFiltredQst);



            //console.log(filtredHardQst);
            //console.log('sqjsq');
        }
    });



    app.post('/quiz', urlencodedParser, function (req, res) {
        var newQst = Qst(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });



    app.post('/highScores', urlencodedParser, function (req, res) {
        console.log(req.body);
        var newScore = Score(req.body).save(function (err, data) {
            if (err) throw err;
        });
        Score.find({}, function (err, data) {
            if (err) throw err;
            /*res.json(data);*/

        });
    })

});
