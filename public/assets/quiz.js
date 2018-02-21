function checkAnswer() {
    if ($(this).text()===qst[qstNumber-1]['correct'+filter.lang]){
        console.log('correct answer well done');
    }else{
       console.log('wrong answer'); 
    }
    var options = [...document.querySelectorAll('.opt')];
    for( i = 0; i < options.length; i++){
        if( options[i].innerHTML === qst[qstNumber-1]['correct'+filter.lang] ){
        document.getElementById(options[i].id).style.backgroundColor= 'green';
        }else{ 
        document.getElementById(options[i].id).style.backgroundColor= 'red';
        }
        
        
    }
    $(document).undelegate('.opt','click',checkAnswer);
   
}   
       
    




var qstNumber = 0;
function nextQst(){
    if(qstNumber<14){
    // updating qsts
    document.getElementById('qstNumber').innerText = qstNumber+1;
    document.getElementById('questionText').innerText = qst[qstNumber]['qst'+filter.lang];
        for ( i = 1; i<=4; i++){
    document.getElementById('opt'+i).innerText = qst[qstNumber]['opt'+i+filter.lang];
    document.getElementById('opt'+i).style.backgroundColor = '#cccccc';
     
   }
        qstNumber++;
    $(document).delegate('.opt','click',checkAnswer);
    
} 
}

var qst;

var filter = {
    lang: 'Fr',
    majors: 'drilling'

    /*majors:{
        1:
        2:
        3:
        4:
    }*/
}

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


/*
var qst_data_base = [
    {
        qstEn: "drilling easy qst",
        qstFr: "qst facie forage",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong",
        opt2Fr: "faux",
        opt3En: "wrong",
        opt3Fr: "faux",
        opt4En: "wrong",
        opt4Fr: "faux",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "drilling",
        dif: 'easy'
},
    {
        qstEn: "drilling medium qst",
        qstFr: "qst medium forage",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong",
        opt2Fr: "faux",
        opt3En: "wrong",
        opt3Fr: "faux",
        opt4En: "wrong",
        opt4Fr: "faux",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "drilling",
        dif: 'medium'
},
    {
        qstEn: "drilling hard qst",
        qstFr: "qst difficile forage",
        opt1En: "correct",
        opt1Fr: "juste",
        opt2En: "wrong",
        opt2Fr: "faux",
        opt3En: "wrong",
        opt3Fr: "faux",
        opt4En: "wrong",
        opt4Fr: "faux",
        correctEn: "correct",
        correctFr: "juste",
        qstImage: "",
        descEn: "this is a discription",
        descFr: "une explication",
        major: "drilling",
        dif: 'hard'
}
    
];
*/

/*
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

fillDataBase();
*/
