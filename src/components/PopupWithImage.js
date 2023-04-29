import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCaption = this._popup.querySelector('.image-popup__caption');
    this._image = this._popup.querySelector('.image-popup__image');
  }

  open = (item) => {
    this._image.setAttribute('src', item.link);
    this._image.setAttribute('alt', item.name);
    this._imageCaption.textContent = item.name;
    super.open();
  };
}

export default PopupWithImage;
