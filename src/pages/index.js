import '../pages/index.css';

import { Card } from '../scripts/components/Сard.js';
import { addValidationConfig, toggleLoading } from '../scripts/utils/constants.js';
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
  contentBtnAvatarOrProfile,
  contentBtnAddCard,
  contentBtnDeleteCard,
  btnSubmitAvatar,
  btnSubmitProfile,
  btnSubmitAddCard,
  btnSubmitDeleteCard,
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

Promise.all([
  api.getUserInform(),
  api.getInitialCards()
])
.then(([info, initialCards])=>{
    profileUserInfo.setUserInfo({
      name: info.name,
      about: info.about,
      avatar: info.avatar,
      _id: info._id,
    });
    elementsSection.renderItems(initialCards);
  })
.catch(err => console.log(err));

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_add', addNewcardInElements);
popupAddCard.setEventListeners();
const popupProfile = new PopupWithForm('.popup_type_edit-profile', handleProfileSubmit);
popupProfile.setEventListeners();
const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', handleSubmitAvatar);
popupAvatarEdit.setEventListeners();
const popupCardDelete = new PopupWithSubmit('.popup_type_delete', handleDeleteCardSubmit);
popupCardDelete.setEventListeners();

function handleSubmitAvatar(link) {
  toggleLoading(btnSubmitAvatar, contentBtnAvatarOrProfile, true );
  api
    .editProfileAvatar(link)
    .then(res => profileUserInfo.setUserInfo(res))
    .then(() => this.close())
    .catch(err => console.log(err))
    .finally(() => toggleLoading(btnSubmitAvatar, contentBtnAvatarOrProfile, false ));
}

function handleDeleteCardPopup (card) {
  popupCardDelete.open(card);
}
function handleDeleteCardSubmit(card) {
  toggleLoading(btnSubmitDeleteCard, contentBtnDeleteCard, true );
  return api
  .deleteCard(card.getCardId())
  .then(card.handleDeleteCard())
  .then(() => this.close())
  .catch(err => console.log(err))
  .finally(() => toggleLoading(btnSubmitDeleteCard, contentBtnDeleteCard, false ));
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

function handleCardLikeBtn (id, request) {
  return api
  .toogleStateLike(id, request)
  .then(res => this.changeLikeStatus(res.likes))
  .catch(err => console.log(err));
}

function exportEditProfileValues() {
  const data = profileUserInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
}
function handleProfileSubmit(formInputs) {
  toggleLoading(btnSubmitProfile, contentBtnAvatarOrProfile, true );
  return api
    .editProfile(formInputs)
    .then((res) => { profileUserInfo.setUserInfo(res) })
    .then(() => this.close())
    .catch(err => console.log(err))
    .finally(() => toggleLoading(btnSubmitProfile, contentBtnAvatarOrProfile, false ));
}

const validFormEditProfile = new FormValidator(addValidationConfig(), formElementProfile);
validFormEditProfile.enableValidation();
const validFormAddCard = new FormValidator(addValidationConfig(), formElementAddCard);
validFormAddCard.enableValidation();
const validFormAvatar = new FormValidator(addValidationConfig(), formElementAvatar);
validFormAvatar.enableValidation();

function addNewcardInElements(formInputs) {
  toggleLoading(btnSubmitAddCard, contentBtnAddCard, true );
  return api
  .addNewCard(formInputs)
  .then(res => createCard(res))
  .then(card => elementsSection.addItem(card))
  .then(() => this.close())
  .catch(err => console.log(err))
  .finally(() => toggleLoading(btnSubmitAddCard, contentBtnAddCard, false ));
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
  popupProfile.open();
  validFormEditProfile.removeValidationErrors();
  validFormEditProfile.disabledButtonSubmit();
});
btnAvatarEdit.addEventListener('click', () => {
  popupAvatarEdit.open();
  validFormAvatar.removeValidationErrors();
  validFormAvatar.disabledButtonSubmit();
});






