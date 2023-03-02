let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let inputName = document.querySelector('.popup__input-text_type_name');
let actualName = document.querySelector('.profile__user-name');
let inputAbout = document.querySelector('.popup__input-text_type_job');
let actualAbout = document.querySelector('.profile__user-describe');
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

initialCards.forEach(function (card) {
  const cardTemplate = document
    .querySelector('#elements-template')
    .content.cloneNode(true);
  const cardHeading = cardTemplate.querySelector('.elements__title');
  cardHeading.textContent = card.name;
  const cardImage = cardTemplate.querySelector('.elements__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `На фотографии ${card.name}`);

  cardsContainer.append(cardTemplate);

  // cardElement.querySelector('.elements__title').textContent =
  //   initialCards[i].name;
  // console.log(cardElement.querySelector('.elements__title').textContent);
});

function openPopup() {
  popup.classList.add('popup_opened');

  inputName.value = actualName.textContent;
  inputAbout.value = actualAbout.textContent;
}

let exitButton = document.querySelector('.popup__exit');

function closePopup() {
  popup.classList.remove('popup_opened');
}

let formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault();

  actualName.textContent = inputName.value;
  actualAbout.textContent = inputAbout.value;

  closePopup();
}

exitButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', handleFormSubmit);
