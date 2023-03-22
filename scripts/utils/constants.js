const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__edit-button');
const btnAddCard = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const formElementAddCard = document.forms['card-form'];
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formElementProfile = document.forms['profile-form'];
const nameInput = popupProfile.querySelector('.popup__input_data_name');
const jobInput = popupProfile.querySelector('.popup__input_data_job');

export {
  btnEdit,
  btnAddCard,
  formElementAddCard,
  formElementProfile,
  nameInput,
  jobInput
};

export function addValidationConfig() {
  return {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    fiedSetSelector: '.popup__set',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };
};

export function initialCards () {
  return [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]
};
