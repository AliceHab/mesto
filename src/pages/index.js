import './index.css';
import initialCards from '../components/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import config from '../components/config.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PicturePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const buttonEditInfo = document.querySelector('.profile__edit-button');
const inputNamePopupInfo = document.querySelector(
  '.popup__input-text_type_name'
);
const inputAboutPopupInfo = document.querySelector(
  '.popup__input-text_type_job'
);
const buttonAddCard = document.querySelector('.profile__add-button');
const cardsContainerSelector = '.elements';

// Создание карточки
// Принимает на вход объект с именем и ссылкой
function createCard(item) {
  const newCard = new Card(item, '.elements-template', () => {
    popupImage.open(item);
  });

  return newCard.generateCard();
}

const userInfo = new UserInfo('.profile__user-name', '.profile__user-describe');

// Попапы
const popupInfoUser = new PopupWithForm('.popup', (item) => {
  userInfo.setUserInfo(item);
});
const popupAdd = new PopupWithForm('.popup-add', (item) => {
  cardList.addItem(createCard(item));
});
const popupImage = new PopupWithImage('.image-popup');

popupInfoUser.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

// Добавление карточек при открытии страницы
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  cardsContainerSelector
);

cardList.renderItems();

// Включение валидации для форм
const addCardFormValidator = new FormValidator(config, '.popup-add');
addCardFormValidator.enableValidation();
const profileFormValidator = new FormValidator(config, '.popup-edit');
profileFormValidator.enableValidation();

// Обработчики
buttonEditInfo.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  inputNamePopupInfo.value = userInfoData.name;
  inputAboutPopupInfo.value = userInfoData.about;
  popupInfoUser.open();
});
buttonAddCard.addEventListener('click', () => popupAdd.open());
