const button = document.getElementById('calculate-button');
const input = {
    day: document.getElementById('day-input'),
    month: document.getElementById('month-input'),
    year: document.getElementById('year-input')
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

function checkAllInput() {
    if (input.day.value === '' || input.month.value === '' || input.year.value === '') {
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
    }
    else {
        alert('Preencha todos os campos!');
    }
});