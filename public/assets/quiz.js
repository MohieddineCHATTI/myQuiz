function checkAnswer() {
    alert('checking answer');
}
var qst_data_base = [
    {
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "drilling",
        dif: 'easy'
},
    {
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "production",
        dif: 'easy'
},{
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "geology",
        dif: 'easy'
},
    {
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "drilling",
        dif: 'medium'
},
    {
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "production",
        dif: 'medium'
},{
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "geology",
        dif: 'medium'
},{
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "drilling",
        dif: 'hard'
},
    {
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "production",
        dif: 'hard'
},{
        qstEn: "String",
        qstFr: "String",
        opt1En: "String",
        opt1Fr: "String",
        opt2En: "String",
        opt2Fr: "String",
        opt3En: "String",
        opt3Fr: "String",
        opt4En: "String",
        opt4Fr: "String",
        correctEn: "String",
        correctFr: "String",
        qstImage: "String",
        descEn: "String",
        descFr: "String",
        major: "geology",
        dif: 'hard'
}
];
var qsts;
var fltr = {
    lang: 'english',
    majors: 'drilling'
}
function starting(){
    alert('starting');
    
    $.ajax({
       
        type: 'POST',
        url: '/qstDataBase',
        data: fltr,
        success: function(data){
            qsts = data;
            console.log(qsts);
        }
        
    });
}


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