import './styles/style.sass';
import Inputmask from 'inputmask';

const form = document.getElementById('form');
const buttonSubmit = document.getElementById('submit');
const buttonCloseModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateForm(form);

  // Пример: отправка данных формы с использованием fetch API
  // fetch('ваш_серверный_обработчик.php', {
  //   method: 'POST',
  //   body: new FormData(e.target)
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     // Обработка ответа от сервера (если нужно)
  //   })
  //   .catch(error => {
  //     console.error('Произошла ошибка', error);
  //   });
});

// Ajax отправка формы
function sendForm(form) {
  fetch('ваш_серверный_обработчик.php', {
    method: 'POST',
    body: new FormData(form)
  })
    .then(response => response.json())
    .then(data => {
      if(data.status === 'error') {
        for (let key in data.fields) {
          let field = form.querySelector(`[name="${key}"]`).parentNode;
          field.classList.add('form__field_error');
          let errMessage = field.querySelector('.error');
          errMessage.innerText = data.fields[key];
        }
      } else if(data.status === 'success') {
        alert(data.msg);  // Выводим сообщение об успешной отправке
      }
    })
    .catch(error => {
      console.error('Произошла ошибка', error);
    });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if(validateForm(form)) {
    sendForm(form);
  }
});


buttonSubmit.addEventListener('click', () => {
  showModal();
});

buttonCloseModal.addEventListener('click', () => {
  closeModal();
});

function showModal() {
  // modal.classList.toggle('hidden');
  // form.classList.toggle('hidden');
}

function closeModal() {
  modal.classList.toggle('hidden');
  form.classList.toggle('hidden');
}

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
          errMessage.innerText = 'Введите сообщение ';
        }
        break;

      default:
        break;
    }
  }
  return validate;
}

