export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  addItem (element) {
    this._container.prepend(element);
  }
  addItemReverse(element) {
    this._container.append(element);
  }
  renderItems(data) {
    data.forEach(item => {
      this.addItemReverse(this._renderer(item));
    });
  }
}
