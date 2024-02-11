import {
  EMAIL_REG,
  VALIDATE_MESSAGE,
} from '../../shared/lib/constants/constants';

export function validateForm(form) {
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
          setErrorMessage(VALIDATE_MESSAGE.NAME, formField);
        }
        break;
      case 'email':
        let regex = EMAIL_REG;
        if (!regex.test(field.value)) {
          validate = false;
          setErrorMessage(VALIDATE_MESSAGE.EMAIL, formField);
        }
        break;
      case 'phone':
        if (field.value.includes('_') || field.value == '') {
          validate = false;
          setErrorMessage(VALIDATE_MESSAGE.PHONE, formField);
        }
        break;
      case 'message':
        if (field.value.length < 2) {
          validate = false;
          setErrorMessage(VALIDATE_MESSAGE.MESSAGE, formField);
        }
        break;

      default:
        break;
    }
  }
  return validate;
}

function setErrorMessage(message, formField) {
  formField.classList.add('form__field_error');
  const errMessage = formField.querySelectorAll('.error')[0];
  errMessage.innerText = message;
}
