// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_about-me');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__button-close');

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  popup.classList.add('popup_opened');
}
function closePopup() {
  popup.classList.remove('popup_opened');
}
function handleFormSubmit(evt) {
  evt.preventDefault();

  let job = jobInput.value;
  let name = nameInput.value;

  profileName.textContent = name;
  profileAboutMe.textContent = job;

  closePopup();
}



formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
