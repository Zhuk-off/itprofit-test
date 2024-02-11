import './styles/style.sass';
import Inputmask from 'inputmask';

const form = document.forms.form;
const modalButton = document.getElementById('modal-button');
const modalButtonClose = document.getElementById('closeModal');

// AJAX отправка формы
function sendForm(form) {
  form.classList.add('rotate-vert-center');
  const button = form.querySelector('.form__submit-button');
  console.log(button);
  button.setAttribute('disabled', 'disabled');
  const status = form.querySelector('.form__status');
  status.classList.remove('form__status_err');
  status.classList.remove('form__status_success');
  form.classList.remove('form_success');
  form.classList.remove('form_error');

  fetch('http://localhost:9090/api/registration', {
    method: 'POST',
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      if (data.status === 'error') {
        form.classList.remove('form_success');
        form.classList.add('form_error');
        status.classList.remove('form__status_success');
        status.classList.add('form__status_err');

        status.innerText = data?.fields?.inputName;
      } else if (data.status === 'success') {
        form.reset();
        console.log(data?.message);
        form.classList.remove('form_error');
        form.classList.add('form_success');
        status.classList.add('form__status_success');
        status.classList.remove('form__status_err');
        status.innerText = data?.message;
      }
    })
    .catch((error) => {
      console.error('Произошла ошибка', error);
    })
    .finally(() => {
      setTimeout(() => {
        form.classList.remove('rotate-vert-center');
        button.removeAttribute('disabled');
      }, 500);
    });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm(form)) {
    sendForm(form);
  }
});

// Маска для телефона
const phoneInputs = document.getElementById('phone');
const im = new Inputmask('+375-(99)-999-99-99');
im.mask(phoneInputs);

// валидация
function validateForm(form) {
  let formFields = form.querySelectorAll('.form__field');
  let validate = true;
  for (let formField of formFields) {
    let field = formField.getElementsByTagName('input')[0];
    if (!field) {
      field = formField.getElementsByTagName('textarea')[0];
    }
    formField.classList.remove('form__field_error');

    switch (field.name) {
      case 'name':
        if (field.value.length < 2) {
          validate = false;
          formField.classList.add('form__field_error');
          const errMessage = formField.querySelectorAll('.error')[0];
          errMessage.innerText = 'Введите имя';
        }
        break;
      case 'email':
        let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!regex.test(field.value)) {
          validate = false;
          formField.classList.add('form__field_error');
          const errMessage = formField.querySelectorAll('.error')[0];
          errMessage.innerText = 'Введите корректный email';
        }
        break;
      case 'phone':
        if (field.value.includes('_') || field.value == '') {
          validate = false;
          formField.classList.add('form__field_error');
          const errMessage = formField.querySelectorAll('.error')[0];
          errMessage.innerText = 'Введите номер телефона';
        }
        break;
      case 'message':
        if (field.value.length < 2) {
          validate = false;
          formField.classList.add('form__field_error');
          const errMessage = formField.querySelectorAll('.error')[0];
          errMessage.innerText = 'Введите сообщение';
        }
        break;

      default:
        break;
    }
  }
  return validate;
}

modalButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  document.body.classList.toggle('no-scroll');
  modal.showModal();
  modal.classList.remove('slide-out-blurred-top');
  modal.classList.add('slide-in-blurred-top');
});

modalButtonClose.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  document.body.classList.toggle('no-scroll');
  modal.classList.remove('slide-in-blurred-top');
  modal.classList.add('slide-out-blurred-top');
  setTimeout(() => {
    modal.close();
    modal.classList.remove('slide-out-blurred-top');
  }, 450);
});
