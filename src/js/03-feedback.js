import throttle from 'lodash.throttle';

const emailInputEl = document.querySelector('input');
const mesgInputEl = document.querySelector('textarea');
const formEl = document.querySelector('form');
const formBtn = document.querySelector('button');
const STORAGE_KEY = 'feedback-form-state';
populateForm();

formEl.addEventListener(
  'input',
  throttle(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        email: formEl.email.value,
        message: formEl.message.value,
      })
    );
  }, 500)
);

formEl.addEventListener('submit', e => {
  e.preventDefault();
  formEl.reset();
  localStorage.removeItem(STORAGE_KEY);
});

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    emailInputEl.value = savedData.email.trim();
    mesgInputEl.value = savedData.message.trim();
  }
}
