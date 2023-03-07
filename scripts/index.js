// Константы
import initialCards from './initialCards.js';
const popupInfo = document.querySelector('.popup');
const buttonEditInfo = document.querySelector('.profile__edit-button');
const inputNamePopupInfo = document.querySelector(
  '.popup__input-text_type_name'
);
const actualName = document.querySelector('.profile__user-name');
const inputAboutPopupInfo = document.querySelector(
  '.popup__input-text_type_job'
);
const actualAbout = document.querySelector('.profile__user-describe');
const popupAddCard = document.querySelector('.popup-add');
const inputCardName = popupAddCard.querySelector(
  '.popup-add__input-text_type_name'
);
const inputCardLink = popupAddCard.querySelector(
  '.popup-add__input-text_type_link'
);
const buttonAddCard = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const popupImageOpen = document.querySelector('.image-popup');

// Создание карточки
function createCard(card) {
  const cardTemplate = document
    .querySelector('#elements-template')
    .content.cloneNode(true);

  const cardHeading = cardTemplate.querySelector('.elements__title');
  cardHeading.textContent = card.name;

  const cardImage = cardTemplate.querySelector('.elements__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `${card.name}`);
  cardImage.addEventListener('click', openPopupImage);

  const likeCard = cardTemplate.querySelector('.elements__like-icon');
  likeCard.addEventListener('click', lineOnClick);

  const deleteButton = cardTemplate.querySelector('.elements__delete');
  deleteButton.addEventListener('click', handleDeleteButton);

  cardsContainer.append(cardTemplate);
}

// Создание карточек при загрузке странице
initialCards.forEach(createCard);

// Создание новой карточки
const formElementAdd = popupAddCard.querySelector('.popup__form');
function addCard(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };

  createCard(newCardObject);
  closePopupAdd();
}

// Лайк
function lineOnClick(evt) {
  evt.target.classList.toggle('elements__like-icon_active');
}

// Открыть картинку
function openPopupImage(evt) {
  const imageToOpen = evt.target;
  const linkToImage = imageToOpen.getAttribute('src');
  const openImage = popupImageOpen.querySelector('.image-popup__image');
  const imageCaption = popupImageOpen.querySelector('.image-popup__caption');
  openImage.setAttribute('src', linkToImage);
  imageCaption.textContent = imageToOpen.getAttribute('alt');
  popupImageOpen.classList.add('popup_opened');
}

// Удаление карточки при нажатии на кнопку
function handleDeleteButton(evt) {
  const deleteButton = evt.target;
  const card = deleteButton.closest('.elements__item');
  card.remove();
}

// Открытие попапа профиля и попапа добавления карточки
function openPopup() {
  popupInfo.classList.add('popup_opened');
  inputNamePopupInfo.value = actualName.textContent;
  inputAboutPopupInfo.value = actualAbout.textContent;
}
function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}

// Закрытие попапа профиля, попапа добавления карточки
// и попапа открытия картинки
const exitButtonPopupInfo = document.querySelector('.popup__exit');
const exitButtonPopupAdd = popupAddCard.querySelector('.popup__exit');
const exitButtonPopupImage = popupImageOpen.querySelector('.image-popup__exit');
function closePopupInfo() {
  popupInfo.classList.remove('popup_opened');
}
function closePopupAdd() {
  popupAddCard.classList.remove('popup_opened');
}
function closePopupImage() {
  popupImageOpen.classList.remove('popup_opened');
}

// Изменение информации в профиле
const formElementInfo = document.querySelector('.popup__form');
function handleFormSubmit(evt) {
  evt.preventDefault();
  actualName.textContent = inputNamePopupInfo.value;
  actualAbout.textContent = inputAboutPopupInfo.value;
  closePopupInfo();
}

exitButtonPopupInfo.addEventListener('click', closePopupInfo);
exitButtonPopupAdd.addEventListener('click', closePopupAdd);
exitButtonPopupImage.addEventListener('click', closePopupImage);
buttonEditInfo.addEventListener('click', openPopup);
buttonAddCard.addEventListener('click', openPopupAddCard);
formElementInfo.addEventListener('submit', handleFormSubmit);
formElementAdd.addEventListener('submit', addCard);
