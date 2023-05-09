class Card {
  constructor(data, cardTemplateSelector, handlers, userID) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerID = data.owner._id;
    this._cardID = data._id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardImageClick = handlers.handleImageZoom;
    this._handleLikeCard = handlers.handleLikeCard;
    this._handlecardDelete = handlers.handleDeleteCard;
    this._userID = userID;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  hasLike() {
    return this._likes.find((like) => like._id === this._userID);
  }

  _renderLikes() {
    this._likes.forEach((element) => {
      if (element._id === this._userID) {
        this._handleLikeButton();
      }
    });
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle('elements__like-icon_active');
  };

  handleDeleteButton = () => {
    this._element.remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handlecardDelete(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardImageClick(this._name, this._link);
    });
  }

  updateLikesCounter(item) {
    this._likesCounter.textContent = item.likes.length;
    this._handleLikeButton();
  }

  getCardID() {
    return this._cardID;
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

    if (this._ownerID !== this._userID) {
      this._deleteButton.classList.toggle('elements__delete_inactive');
    }

    this._likesCounter = this._element.querySelector('.elements__like-counter');
    this._renderLikes();
    this._likesCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
