import throttle from 'lodash.throttle';
import {
  saveLocalStorage,
  loadLocalStorage,
  updateLocalStorage,
} from './dzApi';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');
const input = form.querySelector('input');

const LOCALSTORAGE_KEY = 'feedback-form-state';

const handleSubmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert(' Всі поля форми повинні бути заповнені');
  }
  const user = {};
  const formDate = new FormData(event.currentTarget);
  formDate.forEach((value, name) => {
    user[name] = value;
  });

  console.log('user', user);
  event.currentTarget.reset();
  updateLocalStorage(LOCALSTORAGE_KEY);
};

const updateDataForm = () => {
  const data = loadLocalStorage(LOCALSTORAGE_KEY);

  if (data) {
    textarea.value = data.message;
    input.value = data.email;
  }
};

const handleInput = e => {
  const dataForm = {};
  dataForm.email = input.value;
  dataForm.message = textarea.value;
  saveLocalStorage(LOCALSTORAGE_KEY, dataForm);
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', throttle(handleInput, 500));

updateDataForm();
