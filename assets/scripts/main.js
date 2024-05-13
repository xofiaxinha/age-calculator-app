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
};
const result = {
    year: document.getElementById('year-value'),
    month: document.getElementById('month-value'),
    day: document.getElementById('day-value')
};
const dataExemplo = {
    data: new Date(),
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
};
const errorMessages = {
    day: document.getElementById('error-d'),
    month: document.getElementById('error-m'),
    year: document.getElementById('error-y'),
    empty_message: "This field is required",
    invalid_messages: {
        day_valid: "Must be a valid day",
        day_future: "Must be a day in the past",
        month_valid: "Must be a valid month",
        month_future: "Must be a month in the past",
        year_invalid: "Must be a valid year",
        year_future: "Must be a year in the past"
    }
};
function checkDay(day){
    if(day < 1 || day > 31){
        return false;
    }
    if(parseInt(input.month.value) === 2){
        if(day === 29 && parseInt(input.year.value) % 4 === 0){
            return false;
        }
        if(day > 28){
            return false;
        }
    }
    if((parseInt(input.month.value) === 4 || parseInt(input.month.value) === 6 || parseInt(input.month.value) === 9 || parseInt(input.month.value) === 11) && day > 30){
        return false;
    }
    if(parseInt(input.year.value) === dataExemplo.year && parseInt(input.month.value) === dataExemplo.month && day > dataExemplo.day){
        return false;
    }
    return true;
}
function checkMonth(month){
    if(month < 1 || month > 12){
        return false;
    }
    if(parseInt(input.year.value) === dataExemplo.year && month > dataExemplo.month){
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
    if(!checkDay(dia) || !checkMonth(mes) || !checkYear(ano)){
        return false;
    }
    return true;
}
function validateIndividualInputs(){
    let day = parseInt(input.day.value);
    let month = parseInt(input.month.value);
    let year = parseInt(input.year.value);
    if(!checkDay(day)){
        if(year == dataExemplo.year && month == dataExemplo.month && day > dataExemplo.day){
            showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day_future);
            inputEmpty(input.day, input.day_label);
        }
        else{
        showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day);
        inputEmpty(input.day, input.day_label);}
    }
    if(!checkMonth(month)){
        if(year == dataExemplo.year && month > dataExemplo.month){
            showErrorMessage(errorMessages.month, errorMessages.invalid_messages.month_future);
            inputEmpty(input.month, input.month_label);
        }
        else{
            showErrorMessage(errorMessages.month, errorMessages.invalid_messages.month);
            inputEmpty(input.month, input.month_label);
        }
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
    let years = dataExemplo.year - parseInt(input.year.value);
    let months = dataExemplo.month - parseInt(input.month.value);
    let days = dataExemplo.day - parseInt(input.day.value);

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