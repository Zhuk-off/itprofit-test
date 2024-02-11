import './styles/style.sass';
import { modalEvents, phoneMask, sendForm, validateForm } from './model';

const form = document.forms.form;
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm(form)) {
    sendForm(form);
  }
});

phoneMask();

modalEvents();
