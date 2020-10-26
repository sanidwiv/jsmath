// Generate a random number of given digits
function gen_rand(digits){
  num = 0;
  for (var i=1;i<=digits;i = i+1){
      if (i==1){
          dig = Math.ceil(Math.random()*9)
      }else {
          dig = Math.floor(Math.random()*10)
      }
      num = num*10+dig
  }
  return(num)
}

// Convert a number to an array with each digit coming as a string
function num_to_array(number){
  str_array = number.toString();
  length = str_array.length;
  var num_array= [length];
  for (var i=0;i < length;i++){
      num_array[i] = parseInt(str_array[i]);
  }
  return(num_array)
}

//Covert a digits array to a number
function array_to_num(num_array){
    length = num_array.length;
    num = 0;
    for (var i=0;i<length; i++){
        num = num*10+num_array[i];
    }
    return(num);
}

//Reverse an array
function reverse_array(array){
  tmp_arr = [];
  for(var i=array.length-1;i >0; i--){
      tmp_arr.push(array[i])
  }
  return(tmp_arr)
}

// This function will fill an array with 0s at left and right
function fill_array(array,left,right) {
  for (var i=0;i<left;i++) {
      array.unshift(0);
  }
  for (var i=0;i<right;i++) {
      array.push(0);
  }
}