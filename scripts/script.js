import { initialCards } from './cards.js';
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
//
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
//Функция создания новой карточки
function createCard(name, link) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardItem.querySelector('.card__title').textContent = name;
  const buttonLike = cardItem.querySelector('.card__button-like');
  buttonLike.addEventListener('click', handleCardLike);
  const buttonDeleteCard = cardItem.querySelector('.card__delete');
  buttonDeleteCard.addEventListener('click', handleDeleteCard);
  const photoIncrease = cardItem.querySelector('.card__image');
  photoIncrease.addEventListener('click', handleIncreasePhoto);
  return cardItem;
};
//Функция рендера новой карточки
function renderNewCard() {
  const name = imageTitleInput.value;
  const link = urlInput.value;
  const card = createCard(name, link);
  elements.prepend(card);
};
//Функция рендера карточек из массива
function renderArrayCard() {
  initialCards.forEach(function (initialCards) {
    const name = initialCards.name;
    const link = initialCards.link;
    const card = createCard(name, link);
    elements.append(card);
  })
};
// Функция лайка
function handleCardLike(evt) {
    if(evt.target.classList.contains('card__button-like')) {
    evt.target.classList.toggle('card__button-like_active'); }
};
// Функция удаления карточки
function handleDeleteCard(evt) {
  if (evt.target.classList.contains('card__delete')) {
    const eTarget = evt.target.closest('.card');
    eTarget.remove();
  }
};
// Функция увеличения картинки карточки
function handleIncreasePhoto(evt) {
  const eTarget = evt.target.closest('.card__image');
  if (eTarget) {
    popupImg.src = eTarget.src;
    popupImg.alt = eTarget.alt;
    popupSubtitle.textContent = eTarget.alt;
    openPopup(popupPhoto);
  }
};
// Функция добавления новой карточки по кнопке создать
function handleSubmitFormAdd(evt) {
  evt.preventDefault();
  renderNewCard();
  closePopup(popupAddCard);
  evt.target.reset();
};
//Функция открытия модального окна
function openPopup(item) {
  item.classList.add('popup_opened');
}
//Функция закрытия модального окна
function closePopup(item) {
  item.classList.remove('popup_opened');
}
// Функция отправки формы submit ред.профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const job = jobInput.value;
  const name = nameInput.value;
  profileName.textContent = name;
  profileAboutMe.textContent = job;
  closePopup(popupProfile);
}
// слушатель кнопки '+'
btnAddCard.addEventListener('click', function () {
    imageTitleInput.value = '';
    urlInput.value = '';
    openPopup(popupAddCard);
});
// слушатель кнопки закрыть
btnClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
})
// слушатель кнопки 'сохранить' в редактировании профиля
formElementProfile.addEventListener('submit', handleFormSubmit);
formElementAddCard.addEventListener('submit', handleSubmitFormAdd);
// слушатель кнопки 'ред. профиля'
btnEdit.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  openPopup(popupProfile);
});
// кнопка 'закрыть' в ред. профиля
btnClosePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});
// кнопка закрыть ув. картинка
btnClosePopupPhoto.addEventListener('click', function() {
  closePopup(popupPhoto);
});
renderArrayCard();