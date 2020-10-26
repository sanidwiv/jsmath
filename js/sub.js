NUM_COLS = 12;
RIGHT_PADDING = 3;
//clear the top carry row
    function clear_carry()
{
    carry_div = '#carry-row';
    $(carry_div).html('');
    for (i = 1; i <= NUM_COLS - RIGHT_PADDING; i++) {
        $(carry_div).append('<div class="col-1 pl-4 pr-4" id="carry-row-' + i + '"></div>');
    }

}

//Show active numbers
function show_active() {
    num1_active_index = num1_array.length + answer_index -answer_array.length;
    if (num1_active_index >= 0) {
        div_num1 = "#num1-row-" + (NUM_COLS - RIGHT_PADDING + num1_active_index - n1);
        $(div_num1).html('<img class="img-fluid" src="img/filled/' + num1_array[num1_active_index] + '.png">');
    }
    num2_active_index = num2_array.length + answer_index -answer_array.length;
    if (num2_active_index >= 0) {
        div_num2 = "#num2-row-" + (NUM_COLS - RIGHT_PADDING + num2_active_index - n2);
        $(div_num2).html('<img class="img-fluid" src="img/filled/' + num2_array[num2_active_index] + '.png">');
    }
}

//Hide active numbers
function hide_active() {
    num1_active_index = num1_array.length + answer_index -answer_array.length;
    if (num1_active_index >= 0) {
        div_num1 = "#num1-row-" + (NUM_COLS - RIGHT_PADDING + num1_active_index - n1);
        $(div_num1).html('<img class="img-fluid" src="img/normal/' + num1_array[num1_active_index] + '.png">');
    }
    num2_active_index = num2_array.length + answer_index -answer_array.length;
    if (num2_active_index >= 0) {
        div_num2 = "#num2-row-" + (NUM_COLS - RIGHT_PADDING + num2_active_index - n2);
        $(div_num2).html('<img class="img-fluid" src="img/normal/' + num2_array[num2_active_index] + '.png">');
    }

}

// Get current div element where the next input is going
function get_cur_div() {
        if (is_carry) {
            cur_div = '#carry-row-' + (NUM_COLS - RIGHT_PADDING + answer_index - answer_array.length);
        } else {
            cur_div = '#answer-row-' + (NUM_COLS - RIGHT_PADDING + answer_index - answer_array.length);
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
        // You are in the final answer step
        if (is_carry) {
            is_carry = false;
        } else {
            if (answer_index == 0) {
                game_over = true;
            } else {
                answer_index = answer_index - 1;
                is_carry = true;
            }
            // If carry is 0 move to next
            if (carry_answer[answer_index] == 0) {
                // There is no carry. Go to steps
                is_carry = false;
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
        if (is_carry == true) {
            if (number == carry_answer[answer_index]) {
                //Correct
                put_correct(number);
                move_next();
            } else {
                put_incorrect(number);
            }
        } else {
            if (number == answer_array[answer_index]) {
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
    num1_start_index = 1;
    for (var i = 0; i < num1_array.length; i++) {
        div_num = i;
        div = "#num-row-" + div_num;
        $(div).html('<img class="img-fluid" src="img/normal/' + num1_array[i] + '.png">');
    }

    //Write symbol
    div_num = num1_array.length;
    div = "#num1-row-" + div_num;
    $(div).html('<img class="img-fluid" src="img/minus.png">');

    // write number 2
    num2_start_index = num1_array.length + 1;
    for (var i = 0; i < num2_array.length; i++) {
        div_num = num1_array.length + i;
        div = "#num-row-" + div_num;
        $(div).html('<img class="img-fluid" src="img/normal/' + num2_array[i] + '.png">');
    }




}

