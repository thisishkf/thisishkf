$(document).ready(function () {
    $("#createCanvas").on('click keyup',function(e){
        e.preventDefault();
        let _this = $(this);
        drawPlayground(_this.val());
        
    });
});


const drawPlayground = function(num){
    let canvas = $('#no2g').find('#playgound');
    num +=1; //hint row
    let table = $('<table/>');
    for(let x =0; x < num; x++){
        let _tr = $('<tr/>');
        for(let y = 0; y< num; y++){
            $('<td class="clickable"/>').appendTo(_tr);
        }
        _tr.appendTo(table);
    };
    canvas.append(table);
}


const countHorizontal = function(row){
    let sum = 0;
    row.find('.clickable').each(function(){
        sum += isBlack($(this));
    });
}

const updateRowHints = function(row , count){

}

const counrVertical = function(col){

}

const updateColumnHints = function(col , count){

}


const isBlack = function(td){
    return td.hasClass('black') ? 1 : 0 ;
}