

export class FormValidator {
  constructor(config, validElement) {
    this._config = config;
    this._validElement = validElement;
    this._inputList = this._getInputsList();
    this._buttonElement = this._validElement.querySelector(this._config.submitButtonSelector);
  }
  _getInputsList() {
    return Array.from(this._validElement.querySelectorAll(this._config.inputSelector));
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._validElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  _hideInputError(inputElement) {
    const errorElement = this._validElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledButtonSubmit();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  removeValidationErrors() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  };
  disabledButtonSubmit() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  };
  enableValidation() {
    this._setEventListeners();
  }
}

