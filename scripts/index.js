const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.popup__input-text_type_name');
const actualName = document.querySelector('.profile__user-name');
const inputAbout = document.querySelector('.popup__input-text_type_job');
const actualAbout = document.querySelector('.profile__user-describe');
const popupAddCard = document.querySelector('.popup-add');
const cardName = popupAddCard.querySelector('.popup__input-text_type_name');
const cardLink = popupAddCard.querySelector('.popup__input-text_type_job');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
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

// Создание карточек при загрузке страницы
function createCard(card) {
  const cardTemplate = document
    .querySelector('#elements-template')
    .content.cloneNode(true);

  const cardHeading = cardTemplate.querySelector('.elements__title');
  cardHeading.textContent = card.name;

  const cardImage = cardTemplate.querySelector('.elements__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `На фотографии ${card.name}`);

  const likeCard = cardTemplate.querySelector('.elements__like-icon');
  likeCard.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-icon_active');
  });

  const deleteButton = cardTemplate.querySelector('.elements__delete');
  deleteButton.addEventListener('click', handleDeleteButton);

  cardsContainer.append(cardTemplate);
}
initialCards.forEach(createCard);

function handleDeleteButton(evt) {
  const deleteButton = evt.target;
  const card = deleteButton.closest('.elements__item');
  card.remove();
}

// Открытие попапа профиля и попапа добавления карточки
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = actualName.textContent;
  inputAbout.value = actualAbout.textContent;
}

function openPopupAddCard() {
  popupAddCard.classList.add('popup-add_opened');
}

// Закрытие попапа профиля и попапа добавления карточки
const exitButtonPopupInfo = document.querySelector('.popup__exit');
const exitButtonPopupAdd = popupAddCard.querySelector('.popup__exit');
function closePopupInfo() {
  popup.classList.remove('popup_opened');
}

function closePopupAdd() {
  popupAddCard.classList.remove('popup-add_opened');
}

// Изменение информации в профиле
let formElementInfo = document.querySelector('.popup__form');
function handleFormSubmit(evt) {
  evt.preventDefault();
  actualName.textContent = inputName.value;
  actualAbout.textContent = inputAbout.value;
  closePopupInfo();
}

// Создание новое карточки
let formElementAdd = popupAddCard.querySelector('.popup__form');
function addCard(evt) {
  evt.preventDefault();
  const newCardObject = {
    name: cardName.value,
    link: cardLink.value,
  };
  console.log(newCardObject.name, newCardObject);
  createCard(newCardObject);
  closePopupAdd();
}

exitButtonPopupInfo.addEventListener('click', closePopupInfo);
exitButtonPopupAdd.addEventListener('click', closePopupAdd);
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopupAddCard);
formElementInfo.addEventListener('submit', handleFormSubmit);
formElementAdd.addEventListener('submit', addCard);
