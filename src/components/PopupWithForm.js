import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._popupForm.querySelectorAll('.popup__input-text')
    );
    this._inputData = {};

    this._inputList.forEach((input) => {
      const name = input.name;
      const value = input.value;

      this._inputData[name] = value;
    });

    return this._inputData;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      this._inputValues = this._getInputValues();
      this._handleFormSubmit(this._inputValues);
      this.close();
    });
  }
}

export default PopupWithForm;
