// Константы
import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import config from './config.js';
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
const imagePopup = popupImageOpen.querySelector('.image-popup__image');
const imageCaption = popupImageOpen.querySelector('.image-popup__caption');
const exitButtonPopupInfo = popupInfo.querySelector('.popup__exit');
const exitButtonPopupAdd = popupAddCard.querySelector('.popup__exit');
const exitButtonPopupImage = popupImageOpen.querySelector('.image-popup__exit');
const formElementInfo = document.querySelector('.popup__form');

// Добавление карточки на страницу
function createCard(item) {
  const newCard = new Card(item, '.elements-template', openPopupImage);
  const cardElement = newCard.generateCard();
  return cardElement;
}

function attachCard(cardElement, container) {
  container.prepend(cardElement);
}

// Создание карточек при загрузке странице
initialCards.forEach((initialCard) => {
  attachCard(createCard(initialCard), cardsContainer);
});

// Создание новой карточки через попап add card
const formElementAdd = popupAddCard.querySelector('.popup__form');
function addCard(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };

  attachCard(createCard(newCardObject), cardsContainer);
  formElementAdd.reset();
  closePopup(popupAddCard);
}

// Открытие картинки. Параметр передаем через класс
function openPopupImage(altImage, srcImage) {
  imagePopup.setAttribute('src', srcImage);
  imagePopup.setAttribute('alt', altImage);
  imageCaption.textContent = altImage;
  openPopup(popupImageOpen);
}

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('click', closePopupByClick);
}
function openPopupInfo() {
  openPopup(popupInfo);
  inputNamePopupInfo.value = actualName.textContent;
  inputAboutPopupInfo.value = actualAbout.textContent;
  profileFormValidator.resetError();
}
function openPopupAddCard() {
  openPopup(popupAddCard);
  addCardFormValidator.resetError();
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener('click', closePopupByClick);
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

// Включение валидации для форм
const addCardFormValidator = new FormValidator(config, '.popup-add');
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, '.popup-edit');
profileFormValidator.enableValidation();

// Обработчики
buttonEditInfo.addEventListener('click', openPopupInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);
exitButtonPopupInfo.addEventListener('click', () => closePopup(popupInfo));
exitButtonPopupAdd.addEventListener('click', () => closePopup(popupAddCard));
exitButtonPopupImage.addEventListener('click', () =>
  closePopup(popupImageOpen)
);
formElementInfo.addEventListener('submit', submitProfileForm);
formElementAdd.addEventListener('submit', addCard);
