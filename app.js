
let inputMemory = [];
let calcTotal = 0;
const regEx =/x|\+|\*|-|\//;
let display = document.querySelector('#display');
// const numberMemory = [];
// const operatorMemory = [];


window.onload = function(){
  const btns = document.querySelectorAll('button');
  btns.forEach(btn =>{
    btn.addEventListener('click', evaluateInput);
  })
}

function add(...nums){
  let total = 0;
  nums.forEach(num => total += num);
  return total;
}

function subtract(...nums){
  let total = nums[0];
  for(i = 1; i < nums.length; i++){
    total -= nums[i];
  }
  return total;
}

function multiply(...nums){
  let total = nums[0];
  for(i = 1; i < nums.length; i++){
    total *= nums[i];
  }
  return total;
}

function divide(...nums){
  let total = nums[0];
  for(i = 1; i < nums.length; i++){
    total /= nums[i];
  }
  return total;
}

function operate(num1, num2, oper){
  if(oper === "x"){
    return multiply(num1, num2);
  }
  else if(oper === "+"){
    return add(num1, num2);
  }
  else if(oper === "-"){
    return subtract(num1, num2);
  }
  else if(oper === "/"){
    return divide(num1, num2)
  }
  else{
    console.log('something went wrong');
  }
}

function evaluateInput(){
  let input = this.textContent;
  const len = inputMemory.length;
  const lastInput =inputMemory[len-1];
  if(input.match(regEx)){
    if(len == 0 || lastInput.match(regEx)){ 
      console.log('ERROR');
    }else {
      inputMemory.push(input);
    }
  }else if(input.match(/[0-9]/)){
    inputMemory.push(input);
  }else if(input == "="){
    sortInputMemory();
  }else if(input == "CE"){
    ClearInputs();
    input = '0.0';
  }else if(input == "<"){
    inputMemory = inputMemory.slice(0, len-1);
  }
  updateDisplay(input);
}
  
  


function sortInputMemory(){
    let nums = inputMemory.join('').split(regEx).map(Number);
    let opers = inputMemory.filter(item =>{
      return item.match(regEx);
    })
    while(nums.length > 1){
    calcTotal = operate(nums[0], nums[1], opers[0]);
    calcTotal = Math.round(calcTotal * 100)/100;
    nums.splice(0,2,calcTotal);
    opers.splice(0,1);
    }
    updateDisplay(calcTotal);
}

function updateDisplay(input){
  if(input == '='){
    display.textContent = calcTotal;
  }
  else {
    display.textContent = input;
  }
}

function ClearInputs(){
  calcTotal = 0;
  inputMemory = [];
}
































































