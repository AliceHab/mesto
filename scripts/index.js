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
  '.popup__input-text_type_heading'
);
const inputCardLink = popupAddCard.querySelector(
  '.popup__input-text_type_link'
);
const buttonAddCard = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const popupImageOpen = document.querySelector('.image-popup');
const exitButtonPopupInfo = popupInfo.querySelector('.popup__exit');
const exitButtonPopupAdd = popupAddCard.querySelector('.popup__exit');
const exitButtonPopupImage = popupImageOpen.querySelector('.image-popup__exit');
const formElementInfo = document.querySelector('.popup__form');
const sumbitButtonAddCard = document.querySelector('.popup-add__save-button');

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

  return cardTemplate;
}

// Добавление карточки на страницу
function renderCard(card, container) {
  container.prepend(card);
}

// Создание карточек при загрузке странице
initialCards.forEach(function (card) {
  renderCard(createCard(card), cardsContainer);
});

// Создание новой карточки
const formElementAdd = popupAddCard.querySelector('.popup__form');
function addCard(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };

  renderCard(createCard(newCardObject), cardsContainer);
  inputCardName.value = '';
  inputCardLink.value = '';
  closePopup(popupAddCard);
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
  const imageAttributeAlt = imageToOpen.getAttribute('alt');
  openImage.setAttribute('src', linkToImage);
  openImage.setAttribute('alt', imageAttributeAlt);
  imageCaption.textContent = imageAttributeAlt;
  openPopup(popupImageOpen);
}

// Удаление карточки при нажатии на кнопку
function handleDeleteButton(evt) {
  const deleteButton = evt.target;
  const card = deleteButton.closest('.elements__item');
  card.remove();
}

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('click', closePopupByClick);
  sumbitButtonAddCard.disabled = true;
  sumbitButtonAddCard.classList.add('popup__save-button_disabled');
}
function openPopupInfo() {
  openPopup(popupInfo);
  inputNamePopupInfo.value = actualName.textContent;
  inputAboutPopupInfo.value = actualAbout.textContent;
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}
function closePopupByClick(evt) {
  const openPopup = evt.target.closest('.popup_opened');
  const isPopup = evt.target.closest('.popup__container');
  if (!isPopup) {
    closePopup(openPopup);
  }
}

// Изменение информации в профиле
function submitProfileForm(evt) {
  evt.preventDefault();
  actualName.textContent = inputNamePopupInfo.value;
  actualAbout.textContent = inputAboutPopupInfo.value;
  closePopup(popupInfo);
}

buttonEditInfo.addEventListener('click', openPopupInfo);
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
exitButtonPopupInfo.addEventListener('click', () => closePopup(popupInfo));
exitButtonPopupAdd.addEventListener('click', () => closePopup(popupAddCard));
exitButtonPopupImage.addEventListener('click', () =>
  closePopup(popupImageOpen)
);
formElementInfo.addEventListener('submit', submitProfileForm);
formElementAdd.addEventListener('submit', addCard);
