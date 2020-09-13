
let tempNumArray =[];
let lastInput=[];
let numArray = [];
let opArray = [];
let isLastOperator = false;
let calcTotal = 0;
const regExOp =/x|\+|\*|-|\//;
const regExNum = /[0-9]|\./;
let display = document.querySelector('#display');

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
  if(input.match(regExOp)){
    inputOperator(input);
  }
  else if(input.match(regExNum)){
    inputNumber(input);
  }
  else {
    inputSpecial(input);
  }
}

function inputNumber(input){
  if(input == "."){
    handleDecimal();
  }
  else{
    tempNumArray.push(input);
  }
  isLastOperator = false;
  updateDisplay(tempNumArray.join(''));
}

function handleDecimal(){
  if(tempNumArray.includes(".")){
    return alert('too many decimals!!')
  }
  else {
    tempNumArray.push(".");
  }
}

function inputOperator(input){
  let len = tempNumArray.length-1;
  if(tempNumArray[len] =="."){
    return alert('operator after decimal not allowed!!')
  }
  else if(isLastOperator){
    return alert('only one operator at a time!!!');
  }
  else if(!tempNumArray.length){
    return alert('cant operate without a number!!!');
  }
  else{
    updateDisplay(input);
    pushValuesToArrays(input);
  }
}

function pushValuesToArrays(input){
  let joined = parseFloat(tempNumArray.join(''));
  numArray.push(joined);
  opArray.push(input);
  tempNumArray = [];
  isLastOperator = true; 
}

function updateDisplay(item){
  display.textContent = item;
}

function inputSpecial(input){
  if (input == '='){
    equalSign();
  }
  else if(input == '<'){
    backSpace();
  }
  else if (input == 'CE'){
    clearValues();
    display.textContent = '0.0';
  }
}

function equalSign(){
  if(!opArray.length){
    return alert('nothing to evaluate');
  }
  else {
    pushValuesToArrays();
    prepareCalc();
  }
}

function prepareCalc(){
  while(numArray.length > 1){
  calcTotal = operate(numArray[0], numArray[1], opArray[0]);
  calcTotal = Math.round(calcTotal * 100)/100;
  numArray.splice(0,2,calcTotal);
  opArray.splice(0,1);
  }
  updateDisplay(calcTotal);
  clearValues();
}

function backSpace(){
  let len = tempNumArray.length;
  if(len){
    tempNumArray = tempNumArray.slice(0, len-1);
    updateDisplay(tempNumArray.join(''));
  }
  else {
    return alert('nothing to delete');
  }
}

function clearValues(){
  calcTotal = 0;
  numArray = [];
  opArray = [];
  tempNumArray = [];
  isLastOperator = false;
}

// function evaluateInput(){
//   let input = this.textContent;
//   const len = inputMemory.length;
//   const lastInput =inputMemory[len-1];
//   if(input.match(regEx)){
//     if(len == 0 || lastInput.match(regEx)){ 
//       console.log('ERROR');
//     }else {
//       inputMemory.push(input);
//     }
//   }else if(input.match(/[0-9]/)){
//     inputMemory.push(input);
//   }else if(input == "="){
//     sortInputMemory();
//   }else if(input == "CE"){
//     ClearInputs();
//     input = '0.0';
//   }else if(input == "<"){
//     inputMemory = inputMemory.slice(0, len-1);
//   }
//   updateDisplay(input);
// }
  
  


// function sortInputMemory(){
//     let nums = inputMemory.join('').split(regEx).map(Number);
//     let opers = inputMemory.filter(item =>{
//       return item.match(regEx);
//     })
    // while(numArray.length > 1){
    // calcTotal = operate(numArray[0], numArray[1], opArray[0]);
    // calcTotal = Math.round(calcTotal * 100)/100;
    // numArray.splice(0,2,calcTotal);
    // opArray.splice(0,1);
    // }
    // updateDisplay(calcTotal);
// }

// function updateDisplay(input){
//   if(input == '='){
//     display.textContent = calcTotal;
//   }
//   else {
//     display.textContent = input;
//   }
// }

// function ClearInputs(){
//   calcTotal = 0;
//   inputMemory = [];
// }
































































