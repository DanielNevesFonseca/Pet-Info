import { sendLogin } from "./requests.js";
import { toast } from "./toasts.js";

const colorError = '#c83751';

function authentication(){
  const token = localStorage.getItem('@petInfo:token');

  if(token){
    window.location.replace('./src/pages/dashboard.html')
  }
}

function handleLogin() {
  const inputs = document.querySelectorAll('.login-input')
  const button = document.querySelector('.confirm__button');
  const spinner = document.querySelector('.spinner')
  let loginBody = {};
  let count = 0;

  button.addEventListener('click', (event) => {
    event.preventDefault();
    spinner.classList.remove('hidden');

    inputs.forEach(input => {
      if(input.value.trim() === ""){
        count++;
      }
      loginBody[input.name] = input.value;
    })

    if(count !== 0){
      count = 0;
      toast('Preencha todos os campos!', colorError)
      setTimeout(() => {
        spinner.classList.add('hidden');
      }, 3000);

    } else {
      sendLogin(loginBody);
      setTimeout(() => {
        spinner.classList.add('hidden');
      }, 3000);
    }
  })
}

function redirectToSignupPage() {
  const button = document.querySelector('.register__button');
  const spinner = document.querySelector('.spinner');
  button.addEventListener('click', () => {
    spinner.classList.remove('hidden');
    setTimeout(() => {
      window.location.href = './src/pages/signup.html'
    }, 1000)
  })
}

handleLogin();
redirectToSignupPage();
authentication();