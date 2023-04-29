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
      const isPopup = evt.target.closest('.popup__container');
      if (!isPopup) {
        this.close();
      }
    });

    this._popup.querySelector('.popup__exit').addEventListener('click', () => {
      this.close();
    });
  }
}

export default Popup;
