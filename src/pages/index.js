import '../pages/index.css';

import { Card } from '../scripts/components/Сard.js';
import { addValidationConfig } from '../scripts/utils/constants.js';
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
  formElementAvatar,
  nameInput,
  jobInput,
  btnAvatarEdit,
} from '../scripts/utils/constants.js';

export const profileUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorJob: '.profile__about-me',
  selectorAvatar: '.profile__avatar'
});

export const elementsSection = new Section(
  {
    renderer: item => createCard(item)
  },
  '.elements'
);

import { api } from '../scripts/components/Api.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
api
.getUserInform()
.then(data => {
  profileUserInfo.setUserInfo({
    name: data.name,
    job: data.about,
    avatar: data.avatar,
    _id: data._id,
  });
})
.then(
  api
  .getInitialCards()
  .then(data => elementsSection.renderItems(data))
  .catch(err => console.log(err)),
)
.catch(err => console.log(err));

const popupPhoto = new PopupWithImage('.popup_type_photo');
const popupAddCard = new PopupWithForm('.popup_type_add', addNewcardInElements);
const popupProfile = new PopupWithForm('.popup_type_edit-profile', handleProfileSubmit);
const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', handleSubmitAvatar);
const popupCardDelete = new PopupWithSubmit('.popup_type_delete', handleDeleteCardSubmit);

function handleSubmitAvatar(link) {
  api
    .editProfileAvatar(link)
    .then(res => profileUserInfo.setUserInfo(res))
    .catch(err => console.log(err))
    .then(() => this.close())
    .catch(err => console.log(err))
    .finally(() => this.toggleBtnContent());
}

function handleDeleteCardPopup (card) {
  popupCardDelete.open(card);
}
function handleDeleteCardSubmit(card) {
  return api
  .deleteCard(card.getCardId())
  .then(card.handleDeleteCard())
  .catch(err => console.log(err))
  .then(() => this.close())
  .catch(err => console.log(err))
  .finally(() => this.toggleBtnContent());
}
function createCard(item) {
  return new Card(
    item,
    '.card-template',
    handleIncreasePhoto,
    handleDeleteCardPopup,
    profileUserInfo.getUserId(),
    handleCardLikeBtn,
    ).getTemplate();
}

function handleCardLikeBtn (request) {
  return api
  .toogleStateLike(this._id, request)
  .then(res => this.changeLikeStatus(res.likes))
  .catch(err => console.log(err));
}

function exportEditProfileValues() {
  const data = profileUserInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
}
function handleProfileSubmit(formInputs) {
  return api
    .editProfile(formInputs)
    .then(profileUserInfo.setUserInfo(formInputs))
    .catch(err => console.log(err))
    .then(this.close())
    .catch(err => console.log(err))
    .finally(() => this.toggleBtnContent());
}

const validFormEditProfile = new FormValidator(addValidationConfig(), formElementProfile);
validFormEditProfile.enableValidation();
const validFormAddCard = new FormValidator(addValidationConfig(), formElementAddCard);
validFormAddCard.enableValidation();
const validFormAvatar = new FormValidator(addValidationConfig(), formElementAvatar);
validFormAvatar.enableValidation();

function addNewcardInElements(formInputs) {
  return api
  .addNewCard(formInputs)
  .then(res => createCard(res))
  .then(card => elementsSection.addItem(card))
  .then(this.close())
  .catch(err => console.log(err))
  .finally(() => this.toggleBtnContent());
}

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
btnAvatarEdit.addEventListener('click', () => {
  popupAvatarEdit.open();
  validFormAvatar.removeValidationErrors();
  validFormAvatar.disabledButtonSubmit();
});






