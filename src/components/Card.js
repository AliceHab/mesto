class Card {
  constructor(data, cardTemplateSelector, handleCardImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardImageClick = handleCardImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle('elements__like-icon_active');
  };

  _handleDeleteButton = () => {
    this._element.remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._cardImage.addEventListener('click', () => {
      this._handleCardImageClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardHeading = this._element.querySelector('.elements__title');
    this._cardHeading.textContent = this._name;
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', `${this._name}`);
    this._likeButton = this._element.querySelector('.elements__like-icon');
    this._deleteButton = this._element.querySelector('.elements__delete');

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
