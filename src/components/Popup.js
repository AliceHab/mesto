class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    // Клик на фон закрывает попап
    this._popup.addEventListener('click', (evt) => {
      this._openPopup = evt.target.closest('.popup_opened');
      this._isPopup = evt.target.closest('.popup__container');
      if (!this._isPopup) {
        this.close(this._openPopup);
      }
    });

    this._popup.querySelector('.popup__exit').addEventListener('click', () => {
      this.close();
    });
  }
}

export default Popup;
