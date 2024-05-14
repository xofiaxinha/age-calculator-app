# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Age calculator app solution](#frontend-mentor---age-calculator-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
      - [Main page](#main-page)
      - [Input errors](#input-errors)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
  - [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

#### Main page
![Main page](./assets/images/screenshots/Screenshot%202024-05-14%20at%2011-27-55%20Frontend%20Mentor%20Age%20calculator%20app.png)
#### Input errors
![Input errors](./assets/images/screenshots/Screenshot%202024-05-14%20at%2011-27-31%20Frontend%20Mentor%20Age%20calculator%20app.png)

### Links

- Solution URL: [GitHub Repo](https://github.com/xofiaxinha/age-calculator-app)
- Live Site URL: [Age calculator app](https://xofiaxinha.github.io/age-calculator-app/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Vanilla JS

### What I learned

The biggest challenge I've got while doing this project was to work with the dates, due to the JavaScript format and, well, February and Leap Years :).

```js
//i got really proud of doing this small addition of custom messages depending on the kind of error in each input
if(!checkDay(day)){
    if(year == dataExemplo.year && month == dataExemplo.month && day > dataExemplo.day){
        showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day_future);
        inputEmpty(input.day, input.day_label);
    }
    else{
    showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day_invalid);
    inputEmpty(input.day, input.day_label);}
}
```
```js
//i'll admit, i had a lot of help fom AI to do this part, but it made me learn more about the
//date format and how to use it to validate an input date
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
```

## Author

- Frontend Mentor - [@xofiaxinha](https://www.frontendmentor.io/profile/xofiaxinha)
- GitHub - [xofiaxinha](https://github.com/xofiaxinha)
- LinkedIn - [Maria Sofia](https://www.linkedin.com/in/xofiaxinha/)