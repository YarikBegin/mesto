import { handleIncreasePhoto } from './script.js'
export class Card {
  constructor(element, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._data = element;
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardLike = this._cardElement.querySelector('.card__button-like');
    this._cardDelete = this._cardElement.querySelector('.card__delete');
    this._cardImageIncrease = this._cardElement.querySelector('.card__image');
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };
  generateCard() {
    this._setEventListeners();
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    return this._cardElement;
  }
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._cardImageIncrease.addEventListener('click', () => {
      handleIncreasePhoto(this._cardImage);
    });
  }
  _handleCardLike() {
    this._cardLike.classList.toggle('card__button-like_active');
  };
  _handleDeleteCard() {
      this._cardElement.remove();
      this._cardDelete.remove();
  }
};
