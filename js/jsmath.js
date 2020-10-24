//clear the top carry row
function clear_carry(){
  carry_div = '#carry-row';
  $(carry_div).html('');
  for (i=1;i <=12; i++){
      $(carry_div).append('<div class="col-1 pl-4 pr-4" id="carry-row-' + i + '"></div>');
  }

}

 //Show active numbers
function show_active(){
  num1_active_index = carry_index;
  div_num1 = "#num1-row-" + (12+num1_active_index-n1);
  $(div_num1).html('<img class="img-fluid" src="img/filled/' + num1_array[num1_active_index] + '.png">');
  num2_active_index = n2 - steps_row-1;
  div_num2 = "#num2-row-" + (12+num2_active_index-n2);
  $(div_num2).html('<img class="img-fluid" src="img/filled/' + num2_array[num2_active_index] + '.png">');
}

//Hide active numbers
function hide_active(){
  num1_active_index = carry_index;
  div_num1 = "#num1-row-" + (12+num1_active_index-n1);
  $(div_num1).html('<img class="img-fluid" src="img/normal/' + num1_array[num1_active_index] + '.png">');
  num2_active_index = n2 - steps_row-1;
  div_num2 = "#num2-row-" + (12+num2_active_index-n2);
  $(div_num2).html('<img class="img-fluid" src="img/normal/' + num2_array[num2_active_index] + '.png">');

}

// Get current div element where the next input is going
function get_cur_div(){
  if (answer_step) {
       if (is_carry) {
          cur_div = '#answer-carry-' + (12 + carry_index - answer_array.length);
      } else {
          cur_div = '#answer-row-' + (12 + answer_index - answer_array.length);
      }
  } else {
       if (is_carry) {
           cur_div = '#carry-row-' + (12 + carry_index - num1_array.length-1);
      } else {
          cur_div = '#step-' + steps_row + '-' + (12 + steps_index - steps_array[steps_row].length - steps_row);
      }
  }
  return(cur_div)
}

// Put blank
function put_blank(){
$(get_cur_div()).html('<img class="img-fluid" src="img/blank.gif">');
}

// Put correct value
function put_correct(number){
  $(get_cur_div()).html('<img class="img-fluid" src="img/correct/' + number + '.png">');
}

function put_incorrect(number){
  $(get_cur_div()).html('<img class="img-fluid" src="img/wrong/' + number + '.png">');
}

//Move to the next element.
function move_next(){
  hide_active();
  if (answer_step){
      // You are in the final answer step
      if (is_carry){
          is_carry = false;
          carry_index = carry_index - 1;
      }else {
          if (answer_index < 0){
              game_over = true;
          }else {
            answer_index = answer_index - 1;
            is_carry = true;
          }
          // If carry is 0 move to next
          if (carry_answer[carry_index] == 0) {
              // There is no carry. Go to steps
              carry_index = carry_index - 1;
              is_carry = false;
          }
      }
  }else {
      if (is_carry){
          is_carry = false;
          carry_index = carry_index - 1;
      }else {
          if (steps_index == 0){
              steps_row = steps_row + 1;
              if (steps_row < n2){
                  steps_index = steps_array[steps_row].length-1;
                  carry_row = carry_row + 1;
                  carry_index = carry_array[carry_row].length-1;
              }else {
                  // Move to final answer step
                  answer_step = true;
                  carry_index = carry_answer.length - 1 ;
              }
              clear_carry();

          }else {
            steps_index = steps_index - 1;
            is_carry = true;
          }
          // If carry is 0 move to next
          if (carry_array[carry_row][carry_index] == 0) {
              // There is no carry. Go to steps
              carry_index = carry_index - 1;
              is_carry = false;
          }
      }
  }
  if (game_over){
      alert('Game Over');
  }else {
      // Put blank in the current element
      put_blank();
      show_active();
  }

}

// Take number input from keypad or keyboard
function input(number){
  if (answer_step) {
      if (is_carry == true) {
          if (number == carry_answer[carry_index]) {
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
  } else {
      if (is_carry == true) {
          if (number == carry_array[carry_row][carry_index]){
              //Correct
              put_correct(number);
              move_next();
          } else {
              put_incorrect(number);
          }
      } else {
          if (number == steps_array[steps_row][steps_index]){
              //Correct
              put_correct(number);
              move_next();
          } else {
              put_incorrect(number);
          }

      }
  }
}

//Initialize
function init(){
       // write number 1
      num1_start_index = 12 - num1_array.length;
      for (var i = 0; i < num1_array.length;i++){
          div_num = 12-num1_array.length+i;
          div = "#num1-row-" + div_num;
          $(div).html('<img class="img-fluid" src="img/normal/' + num1_array[i] + '.png">');
      }
      // write number 2
      num2_start_index = 12 - num2_array.length;
      for (var i = 0; i < num2_array.length;i++){
          div_num = 12-num2_array.length+i;
          div = "#num2-row-" + div_num;
          $(div).html('<img class="img-fluid" src="img/normal/' + num2_array[i] + '.png">');
      }

      mult_num = 12-num2_array.length-1;
      div = "#num2-row-" + mult_num;
      $(div).html('<img class="img-fluid" src="img/multiply.png">');

      // Add HTML for intermediate steps
      for (var i=0; i < num2_array.length;i++){
          $("#steps").append('<div class="row mt-2" id="step-'+i+'"></div>');
          step_row = '#step-' + i;
          for (var j=1; j <= 12; j++){
              $(step_row).append('<div class="col-1" id="step-'+i+'-'+j+'"></div>');
          }
      }
}