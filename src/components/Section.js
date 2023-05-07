class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItem(item) {
    this._renderer(item);
  }

  renderItems(items) {
    items.forEach((item) => this.renderItem(item));
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}

export default Section;
