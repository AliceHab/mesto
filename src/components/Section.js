class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsToRender = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    if (this._itemsToRender.length > 1) {
      this._itemsToRender.forEach((item) => this._renderer(item));
    } else {
      this._renderer(this._itemsToRender);
    }
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}

export default Section;
