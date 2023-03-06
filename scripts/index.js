// Константы
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
const initialCards = [
  {
    name: 'Варшава',
    link: 'https://images.unsplash.com/photo-1573157268772-519f309dc212?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  },
  {
    name: 'Краков',
    link: 'https://images.unsplash.com/photo-1573204376098-21156d4534fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  },
  {
    name: 'Лодзь',
    link: 'https://images.unsplash.com/photo-1677072340304-b002650d629b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  },
  {
    name: 'Вроцлав',
    link: 'https://images.unsplash.com/photo-1647079044618-ba91bd341112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  },
  {
    name: 'Познань',
    link: 'https://images.unsplash.com/photo-1544657318-6198f65e31ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
  },
  {
    name: 'Гданьск',
    link: 'https://images.unsplash.com/photo-1664389169560-7b72b73ca651?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  },
];

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
const formElementAdd = popupAddCard.querySelector('.popup-add__form');
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
  popupImageOpen.classList.add('image-popup_opened');
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
  popupAddCard.classList.add('popup-add_opened');
  console.log('Hii');
}

// Закрытие попапа профиля, попапа добавления карточки
// и попапа открытия картинки
const exitButtonPopupInfo = document.querySelector('.popup__exit');
const exitButtonPopupAdd = popupAddCard.querySelector('.popup-add__exit');
const exitButtonPopupImage = popupImageOpen.querySelector('.image-popup__exit');
function closePopupInfo() {
  popupInfo.classList.remove('popup_opened');
}
function closePopupAdd() {
  popupAddCard.classList.remove('popup-add_opened');
}
function closePopupImage() {
  popupImageOpen.classList.remove('image-popup_opened');
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
