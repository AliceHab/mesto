class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsToRender = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItem(item) {
    this._renderer(item);
  }

  renderItems() {
    this._itemsToRender.forEach((item) => this.renderItem(item));
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}

export default Section;
