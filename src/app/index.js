import './styles/style.sass';
import Inputmask from 'inputmask';

const form = document.getElementById('form');
const buttonSubmit = document.getElementById('submit');
const buttonCloseModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
form.addEventListener('submit', function (e) {
  e.preventDefault();

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
const im = new Inputmask("+375-(99)-999-99-99");
im.mask(phoneInputs);

