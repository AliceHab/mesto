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

  _handleLikeButton(evt) {
    evt.target.classList.toggle('elements__like-icon_active');
  }

  _handleDeleteButton(evt) {
    const deleteButton = evt.target;
    const card = deleteButton.closest('.elements__item');
    card.remove();
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', this._handleLikeButton);
    this.deleteButton.addEventListener('click', this._handleDeleteButton);
    this.cardImage.addEventListener('click', () => {
      this._handleCardImageClick(this.cardImage);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this.cardHeading = this._element.querySelector('.elements__title');
    this.cardHeading.textContent = this._name;
    this.cardImage = this._element.querySelector('.elements__image');
    this.cardImage.setAttribute('src', this._link);
    this.cardImage.setAttribute('alt', `${this._name}`);
    this.likeButton = this._element.querySelector('.elements__like-icon');
    this.deleteButton = this._element.querySelector('.elements__delete');

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
