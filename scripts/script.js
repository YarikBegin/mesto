import { addValidationConfig, FormValidator } from './FormValidator.js'
import { Card } from './cards.js';
import { initialCards } from './initialCards.js';
// popup профиля
const btnEdit = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formElementProfile = document.querySelector('.popup__form_type_edit-profile');
const nameInput = formElementProfile.querySelector('.popup__input_data_name');
const jobInput = formElementProfile.querySelector('.popup__input_data_job');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const btnClosePopupProfile = document.querySelector('.popup__button-close_type_edit-profile');
// popup Карточки
const btnAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const formElementAddCard = document.querySelector('.popup__form_type_add');
const imageTitleInput = formElementAddCard.querySelector('.popup__input_data_image');
const urlInput = formElementAddCard.querySelector('.popup__input_data_url');
const btnClosePopupAddCard = document.querySelector('.popup__button-close_type_add');
// popup Фото
const popupPhoto = document.querySelector('.popup_type_photo');
const popupImg = document.querySelector('.popup__photo');
const popupSubtitle = document.querySelector('.popup__subtitle');
const btnClosePopupPhoto = document.querySelector('.popup__button-close_type_photo');
const elements = document.querySelector('.elements');
const validationConfig = addValidationConfig();

function renderCard(cardElement) {
  elements.prepend(cardElement);
}
function addNewCard(element) {
  const card = new Card(element, '.card-template');
  const cardElement = card.generateCard();
  return cardElement;
};
//Функция рендера карточек из массива
function renderArrayCard() {
  initialCards.forEach((item) => {
    document.querySelector('.elements').append(addNewCard(item));
  });
};
renderArrayCard();
// Функция увеличения картинки карточки
export function handleIncreasePhoto(evt, cardImage) {
  const eTarget = evt.target.closest('.card__image');
  if (eTarget) {
    popupImg.src = cardImage.src;
    popupImg.alt = cardImage.alt;
    popupSubtitle.textContent = cardImage.alt;
    openPopup(popupPhoto);
  }
};
// Функция добавления новой карточки по кнопке создать
function handleSubmitFormAdd(evt) {
  evt.preventDefault();
  renderCard(addNewCard({name: imageTitleInput.value, link: urlInput.value}));
  closePopup(popupAddCard);
  evt.target.reset();
};
//Функция открытия модального окна
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEsc);
  document.addEventListener('mousedown', closePopupClickOut);
}
//Функция закрытия модального окна
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEsc);
  document.addEventListener('mousedown', closePopupClickOut);
}
// Функция отправки формы submit ред.профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  const job = jobInput.value;
  const name = nameInput.value;
  profileName.textContent = name;
  profileAboutMe.textContent = job;
  closePopup(popupProfile);
}
//Функция закрытия модального окна по нажатию Escape
function closePopupKeydownEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
//Функция закрытия модального окна по нажатию на фон
function closePopupClickOut(evt) {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.target === popupOpen) {
    if (popupOpen) {
      closePopup(popupOpen);
    }
  }
}
// слушатель кнопки '+'
btnAddCard.addEventListener('click', function () {
  formElementAddCard.reset();
  validFormAddCard.removeValidationErrors();
  validFormAddCard.disabledButtonSubmit();
  openPopup(popupAddCard);
});
// слушатель кнопки закрыть
btnClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
})
// слушатель кнопки 'сохранить' в редактировании профиля
formElementProfile.addEventListener('submit', submitEditProfileForm);
const validFormEditProfile = new FormValidator(validationConfig, formElementProfile);
validFormEditProfile.enableValidation();

formElementAddCard.addEventListener('submit', handleSubmitFormAdd);
const validFormAddCard = new FormValidator(validationConfig, formElementAddCard);
validFormAddCard.enableValidation();
// слушатель кнопки 'ред. профиля'
btnEdit.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  openPopup(popupProfile);
  validFormEditProfile.removeValidationErrors();
  validFormEditProfile.disabledButtonSubmit();
});
// кнопка 'закрыть' в ред. профиля
btnClosePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});
// кнопка закрыть ув. картинка
btnClosePopupPhoto.addEventListener('click', function () {
  closePopup(popupPhoto);
});





