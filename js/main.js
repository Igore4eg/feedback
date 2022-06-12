const form = document.querySelector("form"),
      first_name = document.querySelector("#first_name"),
      last_name = document.querySelector("#last_name"),
      email = document.querySelector("#email"),
      inputTel = document.querySelector("#phone");

const iti =  window.intlTelInput(inputTel, {
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.0/js/utils.js",
  separateDialCode: true,
  initialCountry: "auto",
  nationalMode: true,
  geoIpLookup: async function(callback) {
    let countryCode;
      await fetch("https://ipinfo.io/json?token=2b0dd1f8797f13")
          .then((response) => response.json())
          .then((jsonResponse) => {
              countryCode = jsonResponse.country
          })
    callback(countryCode);
  },
});

const error = {
  nameLength: "More than 2 symbols",
  nameSymbols: "Only letters can be used",
  email: "Enter correct email",
  phone: "Please enter correct number"
}

function errorValidate(inputValidate, textError, event) {
  const divInput = document.querySelector(`.input_${inputValidate.id}`)
  inputValidate.classList.add('invalid-input');
  divInput.insertAdjacentHTML('beforeend', `<div class="error-input-descr">${textError}</div>`);
  event.stopPropagation()
}

form.addEventListener('submit', (e) => {
  document.querySelectorAll('input').forEach((el => el.classList.remove('invalid-input')))
  document.querySelectorAll('.error-input-descr').forEach((el) => el.remove());
  e.preventDefault();
  
  
  if(first_name.value.length < 2) {
    errorValidate(first_name, error.nameLength, e);
  } else if (!first_name.value.match(/^(([a-zA-Z-]{2,30})|([а-яА-ЯЁёІіЇїҐґЄє-]{2,30}))$/u)){
    errorValidate(first_name, error.nameSymbols, e);
  } 

  if(last_name.value.length < 2) {
    errorValidate(last_name, error.nameLength, e);
  } else if (!last_name.value.match(/^(([a-zA-Z-]{2,30})|([а-яА-ЯЁёІіЇїҐґЄє-]{2,30}))$/u)){
    errorValidate(last_name, error.nameSymbols, e);
  } 

  if(!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) ) {
    errorValidate(email, error.email, e);
  } 

  iti.isValidNumber() ? iti.getNumber() : errorValidate(inputTel, error.phone, e)

  if (first_name.value && last_name.value && email.value && iti.getNumber()){
    alert(`First anme: ${first_name.value}, \n Last name: ${last_name.value}, \n Email: ${email.value}, \n Phone: ${iti.getNumber()}`)
    form.reset()
    document.querySelectorAll('input').forEach((el => el.classList.remove('invalid-input')))
    document.querySelectorAll('.error-input-descr').forEach((el) => el.remove());
  }
});