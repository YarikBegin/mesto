
export class Card {
  constructor({ name, link }, templateSelector, handleIncreasePhoto) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleIncreasePhoto = handleIncreasePhoto;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardLike = this._cardElement.querySelector('.card__button-like');
    this._cardDelete = this._cardElement.querySelector('.card__delete');
    this._generateCard();
    this._setEventListeners();
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };
  _generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleIncreasePhoto({ name: this._name, link: this._link });
    });
  }
  _handleCardLike() {
    this._cardLike.classList.toggle('card__button-like_active');
  };
  _handleDeleteCard() {
      this._cardElement.remove();
      this._cardElement = null;
  }
  getCardElement() {
    return this._cardElement;
  }
};
