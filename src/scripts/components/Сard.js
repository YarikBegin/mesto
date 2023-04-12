
export class Card {
  constructor(
    { name, link, likes = [], _id, owner },
    templateSelector,
    handleIncreasePhoto,
    handleDeleteCardPopup,
    userId,
    handleCardLikeBtn,
    )
    {
    this.handleCardLikeBtn = handleCardLikeBtn;
    this._id = _id;
    this._userId = userId;
    this.owner = owner;
    this._handleDeleteCardPopup = handleDeleteCardPopup;
    this._name = name;
    this._link = link;
    this._likesData = likes;
    this._likes = [...likes].length;
    this._templateSelector = templateSelector;
    this._handleIncreasePhoto = handleIncreasePhoto;
    this._cardElement = this._createTemplate();
    this._cardDelete = this._cardElement.querySelector('.card__delete');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardLike = this._cardElement.querySelector('.card__button-like');
    this._cardCounter = this._cardElement.querySelector('.card__counter');
    this._generateCard();
    this.deleteBtnBasket();
    this._setEventListeners();
    if(this._checkLike(this._likesData)) {
      this.handleCardLike();
    }
  }
  //удаление кнопки "корзина" с карточки
  deleteBtnBasket() {
    if(this.owner._id !== this._userId) {
      this._cardDelete.remove();
    }
  }
  _generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardCounter.textContent = this._likes;
  }
  getTemplate() {
    return this._cardElement;
  }
  getCardId() {
    return this._id;
  }
  _createTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };
  _checkLike(arr) {
    return [...arr].some(item => item._id === this._userId);
  }
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      if (this._checkLike(this._likesData)) {
        this.handleCardLikeBtn(this._id, 'DELETE');
      }
      else {
        this.handleCardLikeBtn(this._id, 'PUT');
      }
    });
    if (this._cardDelete) {
      this._cardDelete.addEventListener('click', () => {
        this._handleDeleteCardPopup(this);
      });
    }
    this._cardImage.addEventListener('click', () => {
      this._handleIncreasePhoto({
        name: this._name,
        link: this._link,
        likes: this._likes,
      });
    });
  }
  changeLikeStatus(likes) {
    this._likesData = likes;
    this._cardCounter.textContent = this._likesData.length;
    this.handleCardLike();
  }
  handleCardLike() {
    this._cardLike.classList.toggle('card__button-like_active');
  };
  handleDeleteCard() {
      this._cardElement.remove();
      this._cardElement = null;
  }
};
