import '../pages/index.css';

import { Card } from '../scripts/components/Сard.js';
import { addValidationConfig, initialCards } from '../scripts/utils/constants.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
  btnEdit,
  btnAddCard,
  formElementAddCard,
  formElementProfile,
  nameInput,
  jobInput
} from '../scripts/utils/constants.js';

const profileUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorJob: '.profile__about-me',
});
const popupPhoto = new PopupWithImage('.popup_type_photo');
const popupAddCard = new PopupWithForm('.popup_type_add', addNewCard);
const popupProfile = new PopupWithForm('.popup_type_edit-profile', inputEditProfileValues)

const cardsArray = initialCards();

function exportEditProfileValues() {
  const data = profileUserInfo.getUserInfo();
  nameInput.value = data.user;
  jobInput.value = data.job;
}

function inputEditProfileValues(formInputs) {
  profileUserInfo.setUserInfo(formInputs);
}

const validFormEditProfile = new FormValidator(addValidationConfig(), formElementProfile);
validFormEditProfile.enableValidation();
const validFormAddCard = new FormValidator(addValidationConfig(), formElementAddCard);
validFormAddCard.enableValidation();

function createCard(item) {
  return new Card(item, '.card-template', handleIncreasePhoto).getCardElement();
}
const elementsSection = new Section(
  {
    items: cardsArray.reverse(),
    renderer: item => createCard(item)
  },
  '.elements'
);
function addNewCard(formInputs) {
  elementsSection.addItem(createCard(formInputs));
};

elementsSection.renderItems();

// Функция увеличения картинки карточки
function handleIncreasePhoto(data) {
  popupPhoto.open(data);
};
// слушатель кнопки '+'
btnAddCard.addEventListener('click', () => {
  popupAddCard.open();
  validFormAddCard.removeValidationErrors();
  validFormAddCard.disabledButtonSubmit();
});
// слушатель кнопки 'ред. профиля'
btnEdit.addEventListener('click', () => {
  exportEditProfileValues();
  validFormEditProfile.removeValidationErrors();
  validFormEditProfile.disabledButtonSubmit();
  popupProfile.open();
});






