const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  fiedSetSelector: '.popup__set',
  inactiveButtonClass: '.popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
const formElement = document.querySelector('.popup__form');
const inputElement = formElement.querySelector('.popup__input');



function showInputError (element) {
    element.classList.add('popup__input_type_error');
};
function hideInputError (element) {
    element.classList.remove('popup__input_type_error');
};
function isValid () {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(inputElement);
  } else {
    // Если проходит, скроем
    hideInputError(inputElement);
  }
};

inputElement.addEventListener('input', isValid);