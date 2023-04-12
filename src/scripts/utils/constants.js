const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__edit-button');
const btnAddCard = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const formElementAddCard = document.forms['card-form'];
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formElementProfile = document.forms['profile-form'];
const nameInput = popupProfile.querySelector('.popup__input_data_name');
const jobInput = popupProfile.querySelector('.popup__input_data_job');
const btnAvatarEdit = document.querySelector('.profile__avatar-button');
const formElementAvatar = document.forms['avatar-form'];
const btnSubmitAvatar = document.querySelector('.popup__button-submit-avatar');
const btnSubmitProfile = document.querySelector('.popup__button-submit-profile');
const btnSubmitAddCard = document.querySelector('.popup__button-submit-card');
const btnSubmitDeleteCard = document.querySelector('.popup__button-submit-delete');
const contentBtnAvatarOrProfile = {
  start: 'Сохранить',
  loading: 'Сохранение...'
};
const contentBtnAddCard = {
  start: 'Создать',
  loading: 'Создание...'
};
const contentBtnDeleteCard = {
  start: 'Да',
  loading: 'Удаление...'
};
export {
  btnEdit,
  btnAddCard,
  formElementAddCard,
  formElementProfile,
  formElementAvatar,
  nameInput,
  jobInput,
  btnAvatarEdit,
  contentBtnAvatarOrProfile,
  contentBtnAddCard,
  contentBtnDeleteCard,
  btnSubmitAvatar,
  btnSubmitProfile,
  btnSubmitAddCard,
  btnSubmitDeleteCard,
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
export function toggleLoading(btnSubmit, content, isLoading) {
  if (isLoading) {
    btnSubmit.textContent = content.loading;
  } else {
    btnSubmit.textContent = content.start;
  }
}
