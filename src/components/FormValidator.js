class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
    this._formElement = formElement;
    this._form = document
      .querySelector(this._formElement)
      .querySelector(this._formSelector);
  }

  enableValidation = () => {
    this._inputList = Array.from(
      this._form.querySelectorAll(this.inputSelector)
    );
    this._submitButton = this._form.querySelector(this.submitButtonSelector);
    this._setEventListeners();
  };

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this.errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this.errorClass);
    inputElement.classList.add(this.inputErrorClass);
  }

  _hideInputError(inputElement) {
    this.errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    this.errorElement.classList.remove(this.errorClass);
    this.errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _disableButton() {
    this._submitButton.classList.add(this.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  resetErrors() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export default FormValidator;
