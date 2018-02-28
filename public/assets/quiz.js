function majorAndLanguage() {
    filter.lang = $('#languageSelect').val();
    filter.majors = $('#majorSelect').val();
    $('input[name = major]').val(filter.majors);
    console.log(filter);
    starting();

}









function checkAnswer() {
    $(document).undelegate('.opt', 'click', checkAnswer);
    clearInterval(count);
    var myAnswer = $(this).text();
    if ($(this).text() === qst[qstNumber - 1]['correct' + filter.lang]) {
        console.log('correct answer well done');
        correctAnswers++;
        score = score + t;
        document.getElementById('correct').play();
    } else {
        console.log('wrong answer');
        wrongAnswers++;
        document.getElementById('false').play();
    }
    var options = [...document.querySelectorAll('.opt')];
    for (i = 0; i < options.length; i++) {
        if (options[i].innerHTML === qst[qstNumber - 1]['correct' + filter.lang]) {
            document.getElementById(options[i].id).style.backgroundColor = '#9ce589';
        } else if (options[i].innerHTML == myAnswer) {
            document.getElementById(options[i].id).style.backgroundColor = '#e58989';
        } else {
            document.getElementById(options[i].id).style.backgroundColor = '#e5e189';

        }


    }
    console.log(score);
    setTimeout(nextQst, 2000);
}






var qstNumber = 14,
    score = 0,
    t, correctAnswers = 0,
    wrongAnswers = 0,
    count;

function nextQst() {
    if (qstNumber < 15) {
        // updating qsts
        document.getElementById('qstNumber').innerText = qstNumber + 1;
        document.getElementById('questionText').innerText = qst[qstNumber]['qst' + filter.lang];
        for (i = 1; i <= 4; i++) {
            document.getElementById('opt' + i).innerText = qst[qstNumber]['opt' + i + filter.lang];
            document.getElementById('opt' + i).style.backgroundColor = '#cccccc';

        }
        qstNumber++;

        // start time
        t = 16
        count = setInterval(function () {
            t--;
            console.log('t is =' +
                t);
            if (t == 0) {
                $(document).undelegate('.opt', 'click', checkAnswer);
                clearInterval(count);
                wrongAnswers++;
                document.getElementById('false').play();
                var options = [...document.querySelectorAll('.opt')];
                for (i = 0; i < options.length; i++) {
                    if (options[i].innerHTML === qst[qstNumber - 1]['correct' + filter.lang]) {
                        document.getElementById(options[i].id).style.backgroundColor = '#9ce589';
                    } else {
                        document.getElementById(options[i].id).style.backgroundColor = '#e58989';

                    }

                }
                setTimeout(nextQst, 2000);
            }
        }, 1000);

        $(document).delegate('.opt', 'click', checkAnswer);


    } else {

        document.getElementById('quizContainer').style.display = "none";
        $('input[name = correctAns]').val(correctAnswers);
        $('input[name = wrongAns]').val(wrongAnswers);
        document.getElementById('finish').style.display = "block";

    }
}

var qst;
var filter = {};

function starting() {
    console.log('starting');

    $.ajax({

        type: 'POST',
        url: '/qstDataBase',
        data: filter,
        success: function (data) {
            qst = data;
            nextQst();
        }

    });
}



function saveScore() {
    var myScore = {
        name: $('input[name = name]').val(),
        score: $('input[name = score]').val(),
        country: $('input[name = country]').val(),
        wrongAns: $('input[name = wrongAns]').val(),
        correctAns: $('input[name = correctAns]').val(),
        major: $('input[name = major]').val()
    }
    $.ajax({

        type: 'POST',
        url: '/highScores',
        data: myScore,
        success: function (data) {

            console.log(data);



        }




    })
    console.table(myScore);
}









/*
var qst_data_base = [
    {
        qstEn: "drilling easy qst",
        qstFr: "qst facie forage",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all drilling",
        dif: 'easy'
},
    {
        qstEn: "drilling medium qst",
        qstFr: "qst medium forage",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all drilling",
        dif: 'medium'
},
    {
        qstEn: "drilling hard qst",
        qstFr: "qst difficile forage",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all drilling",
        dif: 'hard'
},
    {
        qstEn: "production easy qst",
        qstFr: "qst facie production",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all production",
        dif: 'easy'
},
    {
        qstEn: "production medium qst",
        qstFr: "qst medium production",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all production",
        dif: 'medium'
},
    {
        qstEn: "production hard qst",
        qstFr: "qst difficile production",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all production",
        dif: 'hard'
},
    {
        qstEn: "geology easy qst",
        qstFr: "qst facie geology",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all geology",
        dif: 'easy'
},
    {
        qstEn: "geology medium qst",
        qstFr: "qst medium geology",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all geology",
        dif: 'medium'
},
    {
        qstEn: "geology hard qst",
        qstFr: "qst difficile geology",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong1",
        opt2Fr: "faux1",
        opt3En: "wrong2",
        opt3Fr: "faux2",
        opt4En: "wrong3",
        opt4Fr: "faux3",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "all geology",
        dif: 'hard'
}

];




function fillDataBase() {

    for (i = 0; i < qst_data_base.length; i++) {
        var item = qst_data_base[i];
        $.ajax({
            type: 'POST',
            url: '/quiz',
            data: item,
            success: function () {
                return 0;
            }


        });
    }
}

fillDataBase();*/
