import { handleIncreasePhoto } from './script.js'

export class Card {
  constructor(element, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardImage.src = element.link;
    this._cardImage.alt = element.name;
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardTitle.textContent = element.name;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._cardImage.src;
    this._element.querySelector('.card__image').alt = this._cardImage.alt;
    this._element.querySelector('.card__title').textContent = this._cardTitle.textContent;
    return this._element;
  }
  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      this._handleCardLike(evt);
      this._handleDeleteCard(evt);
      handleIncreasePhoto(evt, this._cardImage);
    })
  }
  _handleCardLike(evt) {
    if (evt.target.classList.contains('card__button-like')) {
      evt.target.classList.toggle('card__button-like_active');
    }
  };
  _handleDeleteCard(evt) {
    if (evt.target.classList.contains('card__delete')) {
      this._element.remove();
      evt.target.remove();
    }
  }
};
