NUM_COLS = 12;
LEFT_PADDING = 2;

//clear the top carry row
function clear_carry() {
    carry_div = '#carry-row';
    $(carry_div).html('');
    for (i = 1; i <= NUM_COLS - LEFT_PADDING; i++) {
        $(carry_div).append('<div class="col-1 pl-4 pr-4" id="carry-row-' + i + '"></div>');
    }

}

//Show active numbers
function show_active() {
    num1_active_index = answer_index;
    if (num1_active_index < 0) {
        num1_active_index = 0
    }
    div_num1 = "#num1-row-" + (NUM_COLS - LEFT_PADDING + num1_active_index - n1);
    $(div_num1).html('<img class="img-fluid" src="img/filled/' + num1_array[num1_active_index] + '.png">');
    num2_active_index = n2 - steps_row - 1;
    div_num2 = "#num2-row-" + (NUM_COLS - LEFT_PADDING + num2_active_index - n2);
    $(div_num2).html('<img class="img-fluid" src="img/filled/' + num2_array[num2_active_index] + '.png">');
}

//Hide active numbers
function hide_active() {

    num1_active_index = answer_index;
    if (num1_active_index < 0) {
        num1_active_index = 0
    }
    div_num1 = "#num1-row-" + (NUM_COLS - LEFT_PADDING + num1_active_index - n1);
    $(div_num1).html('<img class="img-fluid" src="img/normal/' + num1_array[num1_active_index] + '.png">');
    num2_active_index = n2 - steps_row - 1;
    div_num2 = "#num2-row-" + (NUM_COLS - LEFT_PADDING + num2_active_index - n2);
    $(div_num2).html('<img class="img-fluid" src="img/normal/' + num2_array[num2_active_index] + '.png">');

}

// Get current div element where the next input is going
function get_cur_div() {
        if (is_answer) {
            cur_div = '#carry-row-' + (NUM_COLS - LEFT_PADDING + answer_index - num1_array.length - 1);
        } else {
            cur_div = '#step-' + steps_row + '-' + (NUM_COLS - LEFT_PADDING + steps_index - steps_array[steps_row].length - steps_row);
        }
    return (cur_div)
}

// Put blank
function put_blank() {
    $(get_cur_div()).html('<img class="img-fluid" src="img/blank.gif">');
}

// Put correct value
function put_correct(number) {
    $(get_cur_div()).html('<img class="img-fluid" src="img/correct/' + number + '.png">');
}

function put_incorrect(number) {
    $(get_cur_div()).html('<img class="img-fluid" src="img/wrong/' + number + '.png">');
}

//Move to the next element.
function move_next() {
    hide_active();

    if (is_answer) {
        is_answer = false;
        answer_index = answer_index - 1;
    } else {
        if (steps_index == 0) {
            steps_row = steps_row + 1;
            if (steps_row < n2) {
                steps_index = steps_array[steps_row].length - 1;
                carry_row = carry_row + 1;
                answer_index = answer_array[carry_row].length - 1;
            } else {
                // Move to final answer step
                answer_index = carry_answer.length - 2;
            }
            clear_carry();

        } else {
            steps_index = steps_index - 1;
            is_answer = true;
        }
        // If carry is 0 move to next
        if (answer_array[carry_row][answer_index] == 0) {
            // There is no carry. Go to steps
            answer_index = answer_index - 1;
            is_answer = false;
        }
    }

    if (game_over) {
        alert('Game Over');
    } else {
        // Put blank in the current element
        put_blank();
        show_active();
    }

}

// Take number input from keypad or keyboard
function input(number) {
    if (is_answer == true) {
        if (number == answer_array[answer_index]) {
            //Correct
            put_correct(number);
            move_next();
        } else {
            put_incorrect(number);
        }
    } else {
        if (number == steps_array[steps_row][steps_index]) {
            //Correct
            put_correct(number);
            move_next();
        } else {
            put_incorrect(number);
        }
    }
}

//Initialize
function init() {
    // write number 1
    for (var i = 0; i < num1_array.length; i++) {
        div_num =  LEFT_PADDING + i;
        div = "#num-row-" + div_num;
        $(div).html('<img class="img-fluid" src="img/normal/' + num1_array[i] + '.png">');
    }

    //Write Symbol
    div_num = num1_array.length+LEFT_PADDING;
    div = "#num-row-" + div_num;
    $(div).html('<img class="img-fluid" src="img/div.png">');

    // write number 2
    for (var i = 0; i < num2_array.length; i++) {
        div_num =  LEFT_PADDING + num1_array.length + i +1;
        div = "#num-row-" + div_num;
        $(div).html('<img class="img-fluid" src="img/normal/' + num2_array[i] + '.png">');
    }



    // Add HTML for intermediate steps
    for (var i = 0; i < num2_array.length; i++) {
        $("#steps").append('<div class="row mt-2" id="step-' + i + '"></div>');
        step_row = '#step-' + i;
        for (var j = 1; j <= NUM_COLS - LEFT_PADDING; j++) {
            $(step_row).append('<div class="col-1" id="step-' + i + '-' + j + '"></div>');
        }
    }
}

