$(document).ready(function () {
    var game = {};
    bindCreateCanvasListener("#createCanvas");
});

// Event Listener
const bindCreateCanvasListener = function (id) {
    try {
        $(id).on('click', function (e) {
            let num = $("#canvasSize").val();
            let gameData = generalGame(num);
            game = gameData;
            drawPlayground(parseInt(num), gameData.hints);
            bindClickableListener();
        });
        return true;
    } catch (err) {
        console.log(`bindCreateCanvasListener Error : ${err}`);
        return false;
    }
}

const bindClickableListener = function () {
    try {
        $('body').on('click', '.clickable', function () {
            let _this = $(this);
            switch (_this.prop('data-status')) {
                case 'true':
                    _this.removeClass('blackBlock');
                    _this.addClass('redBlock');
                    _this.prop('data-status', 'false');
                    break;
                case 'false':
                    _this.removeClass('redBlock');
                    _this.addClass('emptyBlock');
                    _this.prop('data-status', 'empty');
                    break;
                case 'empty':
                default:
                    _this.removeClass('emptyBlock');
                    _this.addClass('blackBlock');
                    _this.prop('data-status', 'true');
                    break;
            }
            checkWin();
            return true;
        });
    } catch (err) {
        console.log(`bindClickableListener Error : ${err}`);
        return false;
    }
}

/**
 * 
 * @param {int}     num     
 * @param {Object}  hints   { horizontal : [], vertical : []}
 */
const drawPlayground = function (num, hints) {
    let canvas = $('#no2g').find('#playgound');
    num += 1; //hint row
    let table = $('<table/>');
    for (let y = 0; y < num; y++) {
        let _tr = $('<tr/>');
        for (let x = 0; x < num; x++) {
            if (y == 0) {
                let td = drawVerticalHints(hints.vertical, x);
                $(td).appendTo(_tr);
            } else {
                if (x == 0) {
                    let td = drawHorizontalHints(hints.horizontal, y);
                    $(td).appendTo(_tr);
                } else {
                    $(`<td class="clickable emptyBlock" id="${y}_${x}" data-status="empty"> </td>`).appendTo(_tr);
                }
            }
        }
        _tr.appendTo(table);
    };
    canvas.html(table);
    return;
}

function drawVerticalHints(verticalHints, i) {
    if (i == 0) {
        return $(`<td class="v_hints"> </td>`);
    } else {
        let str = verticalHints[i - 1].toString().replaceAll(',', "<br/>");
        return $(`<td class="v_hints">${str}</td>`);
    }
}

function drawHorizontalHints(horizontallHints, i) {
    let str = horizontallHints[i - 1].toString().replaceAll(',', ' ');
    return $(`<td class="h_hints">${str}</td>`);
}

const countHorizontal = function (row) {
    let sum = 0;
    row.find('.clickable').each(function () {
        sum += isBlack($(this));
    });
}

const updateRowHints = function (row, count) {

}

const counrVertical = function (col) {

}

const updateColumnHints = function (col, count) {

}


const isBlack = function (td) {
    return td.hasClass('blackBlock') ? 1 : 0;
}


const generalGame = function (num) {
    let data = [];
    for (let x = 0; x < num; x++) {
        data[x] = [];
        for (let y = 0; y < num; y++) {
            data[x][y] = Math.random() > 0.35;
        }
    };
    let hints = prepareHints(data, num);
    return { data: data, hints: hints };
}

const prepareHints = function (data, num) {
    let hints = { horizontal: 0, vertical: 0 };
    hints.horizontal = prepareHorizontalHints(data, num);
    hints.vertical = prepareVerticalHints(data, num);
    return hints;

    //local functions for prepareHints
    function prepareHorizontalHints(data, num) {
        let rowHints = [];
        for (let x = 0; x < num; x++) {
            rowHints.push(countFromData(data[x]));
        }
        return rowHints;
    }

    function prepareVerticalHints(data, num) {
        let columnHints = [];
        for (let x = 0; x < num; x++) {
            let columnData = [];
            for (let y = 0; y < num; y++) {
                columnData.push(data[y][x]);
            }
            columnHints.push(countFromData(columnData));
        }
        return columnHints;
    }

    function countFromData(data) {
        let currentCount = 0;
        let rowResult = [];

        for (let x = 0; x < data.length; x++) {
            if (data[x] == true) {
                currentCount++;
            } else if (currentCount > 0) {
                rowResult.push(currentCount);
                currentCount = 0;
            }
        }
        if (currentCount > 0) {
            rowResult.push(currentCount);
        }
        return rowResult.length > 0 ? rowResult : 0;
    }
}

const checkWin = function () {
    let data = [];
    $("#playgound").find('tr').each(function (i) {
        if (i > 0) {
            data[i - 1] = [];
            let _thisTr = $(this);
            
            _thisTr.find('.clickable').each(function () {
                
                let _thisTd = $(this);
                let _thisStatus = false;
                console.log(_thisTd.html());
                switch(_thisTd.prop("data-status")){
                    case "true":
                        _thisStatus = true;
                        break;
                    case "false":
                    case "empty":
                    default:
                        _thisStatus = false;
                }
                data[i - 1].push(_thisStatus);
            });
        }
    });
    if(game.data.toString() == data.toString()){
        alert("You Win!!");
    }
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};