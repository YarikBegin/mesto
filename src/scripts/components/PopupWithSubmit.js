import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, funcSubmit) {
    super(popupSelector);
    this._funcSubmit = funcSubmit;
    this._btnSubmit = this._popup.querySelector('.popup__button-submit');
    this._card = null;
  }

  open(card) {
    super.open();
    this._card = card;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault();
      this.toggleBtnContent();
      this._funcSubmit(this._card);
    });
  }

  toggleBtnContent() {
    const content = this._btnSubmit.innerText;
    if (content === 'Да') {
      this._btnSubmit.innerText = 'Удаление...';
    }
    if (content === 'Удаление...') {
      this._btnSubmit.innerText = 'Да';
    }
  }


}
