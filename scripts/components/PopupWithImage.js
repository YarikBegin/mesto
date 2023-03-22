import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoItem = this._popup.querySelector('.popup__photo');
    this._popupSubtitle = this._popup.querySelector('.popup__subtitle');
  }
  open ({ name, link }) {
    this._photoItem.src = link;
    this._photoItem.alt = name;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}
