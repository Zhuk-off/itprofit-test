import { ROUTES } from '../../shared/lib/constants/routes';

export function sendForm(form) {
  form.classList.add('rotate-vert-center');
  const button = form.querySelector('.form__submit-button');
  button.setAttribute('disabled', 'disabled');
  const status = form.querySelector('.form__status');
  status.classList.remove('form__status_err');
  status.classList.remove('form__status_success');
  form.classList.remove('form_success');
  form.classList.remove('form_error');

  fetch(ROUTES.HOST + ROUTES.REGISTRATION, {
    method: 'POST',
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'error') {
        form.classList.remove('form_success');
        form.classList.add('form_error');
        status.classList.remove('form__status_success');
        status.classList.add('form__status_err');

        status.innerText = data?.fields?.inputName;
      } else if (data.status === 'success') {
        form.reset();
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
