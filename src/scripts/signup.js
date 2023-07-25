import { createUserRegister } from "./requests.js";
import { toast } from "./toasts.js";

const colorError = '#c83751';

function authentication(){
  const token = localStorage.getItem('@petInfo:token');

  if(token){
    window.location.replace('../../pages/dashboard.html')
  }
}

function handleRegister() {
  const inputs = document.querySelectorAll('.register-input')
  const button = document.querySelector('.confirm__button');
  const spinner = document.querySelector('.spinner');
  let registerBody = {};
  let count = 0;

  button.addEventListener('click', (event) => {
    event.preventDefault();
    spinner.classList.remove('hidden');

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        count++;
      }
      registerBody[input.name] = input.value;
    })

    if (count !== 0) {
      count = 0;
      toast('Preencha todos os campos de Registro!', colorError);
      setTimeout(() => {
        spinner.classList.add('hidden');
      }, 3000);
      

    } else {
      createUserRegister(registerBody);
      
      setTimeout(() => {
        spinner.classList.add('hidden');
      }, 3000);
    }
  })
}

function returnToLogin() {
  const button = document.querySelector('.redirect-edit__button');
  button.addEventListener('click', () => {
    window.location.href = '../../index.html'
  })
}

handleRegister();
returnToLogin();
authentication();