import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input-text'));
    this._confirmButton = this._popup.querySelector('.popup__save-button');
    this._confirmButtonActualText = this._confirmButton.value;
  }

  _getInputValues() {
    const inputData = {};

    this._inputList.forEach((input) => {
      const name = input.name;
      const about = input.value;

      inputData[name] = about;
    });
    return inputData;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.value = 'Сохранение...';
    } else {
      this._confirmButton.value = this._confirmButtonActualText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      this._inputValues = this._getInputValues();
      this._handleFormSubmit(this._inputValues);
    });
  }
}

export default PopupWithForm;
