import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = document.forms.popup__delete;
    this._confirmButton = this._popup.querySelector('.popup__save-button');
    this._confirmButtonActualText = this._confirmButton.value;
  }

  overwriteDeleteHandler(cbCardDelete) {
    this._handleFormSubmit = cbCardDelete;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.value = 'Удаление...';
    } else {
      this._confirmButton.value = this._confirmButtonActualText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}

export default PopupWithSubmit;
