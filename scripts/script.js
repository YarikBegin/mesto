import { initialCards } from './cards.js';
// popup профиля
const btnEdit = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formElementProfile = document.querySelector('.popup__form_type_edit-profile');
let nameInput = formElementProfile.querySelector('.popup__input_data_name');
let jobInput = formElementProfile.querySelector('.popup__input_data_job');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
const closeButtonPopupProfile = document.querySelector('.popup__button-close_type_edit-profile');
// popup Карточки
const btnAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const formElementAddCard = document.querySelector('.popup__form_type_add');
let imageTitleInput = formElementAddCard.querySelector('.popup__input_data_image');
let urlInput = formElementAddCard.querySelector('.popup__input_data_url');
const closeButtonPopupAddCard = document.querySelector('.popup__button-close_type_add');
//
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
const btnLike = document.querySelector('.card__button-like');


renderArrayCard();
//Функция создания новой карточки
function createCard(name, link) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__image').alt = name;
  cardItem.querySelector('.card__title').textContent = name;
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
function handleCardLike (evt) {
  if (evt.target.classList.contains('.card__button-like')) {
 evt.target.classList.toggle('.card__button-like_active');
  }
};
function handleSubmitFormAdd (evt) {
  evt.preventDefault();
  renderNewCard();
  closePopup(popupAddCard);
  evt.target.reset();
};




function openPopup(item) {
  item.classList.add('popup_opened');
}
function closePopup(item) {
  item.classList.remove('popup_opened');
}
function handleFormSubmit(evt) {
  evt.preventDefault();
  let job = jobInput.value;
  let name = nameInput.value;
  profileName.textContent = name;
  profileAboutMe.textContent = job;
  closePopup(popupProfile);
}

// слушатель кнопки '+'
btnAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});
// слушатель кнопки закрыть
closeButtonPopupAddCard.addEventListener('click', function () {
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
closeButtonPopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
}
);




