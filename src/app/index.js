import './styles/style.sass';

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
  modal.classList.toggle('hidden');
  form.classList.toggle('hidden');
}

function closeModal() {
  modal.classList.toggle('hidden');
  form.classList.toggle('hidden');
}
