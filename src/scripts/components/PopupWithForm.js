import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
      this.close();
    })
  }
  _getInputValues () {
    const formData = new FormData(this._popupForm); // создаём объект FormData, передаём в него элемент формы
    const name = formData.get('input-image');
    const link = formData.get('input-url');
    const user = formData.get('input-name');
    const job = formData.get('input-job');
    return { name, link, user, job };
  }
  close () {
    super.close();
    this._popupForm.reset();
  }
}
