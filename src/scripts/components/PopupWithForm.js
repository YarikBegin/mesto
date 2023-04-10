import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._btnSubmit = this._popup.querySelector('.popup__button-submit');
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this.toggleBtnContent();
      this._submitFunction(this._getInputValues());
    })
  }
  toggleBtnContent() {
    const content = this._btnSubmit.innerText;
    if (content === 'Сохранить') {
      this._btnSubmit.innerText = 'Сохранение...';
    }
    if (content === 'Сохранение...') {
      this._btnSubmit.innerText = 'Сохранить';
    }
    if (content === 'Создать') {
      this._btnSubmit.innerText = 'Создание...';
    }
    if (content === 'Создание...') {
      this._btnSubmit.innerText = 'Создать';
    }
  }
  _getInputValues () {
  this._formValues = {};
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
  }
  close () {
    super.close();
    this._popupForm.reset();
  }
}
