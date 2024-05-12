const button = document.getElementById('calculate-button');
const input = {
    day: document.getElementById('day-input'),
    month: document.getElementById('month-input'),
    year: document.getElementById('year-input'),
    inputToString: function(){
        return `${this.day.value}/${this.month.value}/${this.year.value}`;
    },
    day_label: document.getElementById('day-label'),
    month_label: document.getElementById('month-label'),
    year_label: document.getElementById('year-label')
}
const result = {
    year: document.getElementById('year-value'),
    month: document.getElementById('month-value'),
    day: document.getElementById('day-value')
}
const dataExemplo = {
    data: new Date(),
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
}
const errorMessages = {
    day: document.getElementById('error-d'),
    month: document.getElementById('error-m'),
    year: document.getElementById('error-y'),
    empty_message: "This field is required",
    invalid_messages: {
        day: "Must be a valid day",
        month: "Must be a valid month",
        year_invalid: "Must be a valid year",
        year_future: "Must be a year in the past"
    }
}
function checkDay(day){
    if(day < 1 || day > 31){
        return false;
    }
    return true;
}
function checkMonth(month){
    if(month < 1 || month > 12){
        return false;
    }
    return true;
}
function checkYear(year){
    if(year < 0 || year > dataExemplo.year){
        return false;
    }
    return true;
}
function validateAllInput(inputString){
    let partesData = inputString.split('/');
    let dia = parseInt(partesData[0]);
    let mes = parseInt(partesData[1]);
    let ano = parseInt(partesData[2]);
    let data = new Date(ano, mes - 1, dia);
    if(data.getDate() != dia || data.getMonth() != mes - 1 || data.getFullYear() != ano){
        return false;
    }
    return true;
}
function validateIndividualInputs(){
    let day = parseInt(input.day.value);
    let month = parseInt(input.month.value);
    let year = parseInt(input.year.value);
    if(!checkDay(day)){
        console.log('entrou');
        showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day);
        inputEmpty(input.day, input.day_label);
    }
    if(!checkMonth(month)){
        showErrorMessage(errorMessages.month, errorMessages.invalid_messages.month);
        inputEmpty(input.month, input.month_label);
    }
    if(!checkYear(year)){
        if(year > dataExemplo.year){
            showErrorMessage(errorMessages.year, errorMessages.invalid_messages.year_future);
            inputEmpty(input.year, input.year_label);
        }
        else{
            showErrorMessage(errorMessages.year, errorMessages.invalid_messages.year_invalid);
            inputEmpty(input.year, input.year_label);
        }
    }

}
function showErrorMessage(errorMessage, message){
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
function hideErrorMessage(errorMessage){
    errorMessage.style.display = 'none';
}
function hideAllErrorMessages(){
    hideErrorMessage(errorMessages.day);
    hideErrorMessage(errorMessages.month);
    hideErrorMessage(errorMessages.year);
}
function normalInput(){
    inputNotEmpty(input.day, document.getElementById('day-label'));
    inputNotEmpty(input.month, document.getElementById('month-label'));
    inputNotEmpty(input.year, document.getElementById('year-label'));
}
function clearResult(){
    result.year.textContent = '--';
    result.month.textContent = '--';
    result.day.textContent = '--';

}
function inputEmpty(input, label){
    input.classList.add('empty-input');
    label.classList.add('empty-text');
}
function inputNotEmpty(input, label){
    input.classList.remove('empty-input');
    label.classList.remove('empty-text');
}
function checkInput(valueInput, errorMessage, label){
    if(valueInput.value === ''){
        showErrorMessage(errorMessage, errorMessages.empty_message);
        inputEmpty(valueInput, label);
        return;
    }
    inputNotEmpty(valueInput, label);
}
function checkAllInput() {
    if(input.day.value === '' || input.month.value === '' || input.year.value === '') {
        checkInput(input.day, errorMessages.day, input.day_label);
        checkInput(input.month, errorMessages.month, input.month_label);
        checkInput(input.year, errorMessages.year, input.year_label);
        return false;
    }
    if(!validateAllInput(input.inputToString())){
        validateIndividualInputs();
        return false;
    }
    return true;
}
function calculateAge(){
    let years = dataExemplo.year - input.year.value;
    let months = dataExemplo.month - input.month.value;
    let days = dataExemplo.day - input.day.value;

    if (days < 0) {
        days = 30 + days;
        months--;
    }
    if(months < 0) {
        months = 12 + months;
        years--;
    }

    result.year.textContent = years;
    result.month.textContent = months;
    result.day.textContent = days;
}
button.addEventListener('click', () => {
    if(checkAllInput()) {
        calculateAge();
        hideAllErrorMessages();
        normalInput();
    }
    else{
        clearResult();
    }
});