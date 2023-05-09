// Импорт css
import './index.css';
// Импорт конфига
import config from '../utils/config.js';
// Импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import api from '../components/Api';

// Селекторы кнопок открытия попапов, полей форм и контейнера для карточек
const buttonEditInfo = document.querySelector('.profile__edit-button');
const inputNamePopupInfo = document.querySelector('.popup__input-text_type_name');
const inputAboutPopupInfo = document.querySelector('.popup__input-text_type_job');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
const cardsContainerSelector = '.elements';

// Объявление классов-слоев
const userInfo = new UserInfo('.profile__user-name', '.profile__user-describe', '.profile__avatar');
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  cardsContainerSelector
);

// Получаем и отрисовываем информацию о пользователе и массив карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.editAvatar(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => console.error(err));

// Создание попапов и включение обработчиков
// Попап редактирования пользователя
const popupInfoUser = new PopupWithForm('.popup', (item) => {
  userInfo.setUserInfo(item);
  popupInfoUser.renderLoading(true);
  api
    .editUserInfo(item)
    .then(() => {
      popupInfoUser.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      popupInfoUser.renderLoading(false);
    });
});
// Попап добавления карточки
const popupAdd = new PopupWithForm('.popup-add', (item) => {
  popupAdd.renderLoading(true);
  api
    .postCard(item)
    .then((item) => {
      cardList.addItem(createCard(item));
    })
    .then(() => {
      popupAdd.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      popupAdd.renderLoading(false);
    });
});
// Попап увеличенный картинки
const popupImage = new PopupWithImage('.image-popup');
// Попап редактирования аватара
const popupAvatar = new PopupWithForm('.popup-avatar', (item) => {
  popupAvatar.renderLoading(true);
  userInfo.editAvatar(item);
  api
    .editAvatar(item)
    .then(() => {
      popupAvatar.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
});
// Попап удаления карточки
const popupDelete = new PopupWithSubmit('.popup-delete');

popupInfoUser.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();

// Включение валидации для форм
const addCardFormValidator = new FormValidator(config, document.forms['popup__info']);
const profileFormValidator = new FormValidator(config, document.forms['popup__add']);
const avatarFormValidator = new FormValidator(config, document.forms['popup__avatar']);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Функция создания карточки
function createCard(cardData) {
  const newCard = new Card(
    cardData,
    '.elements-template',
    // Передаем набор обработчиков: увеличение, лайк и удаление
    {
      handleImageZoom: () => {
        popupImage.open(cardData);
      },
      handleLikeCard: handleLikeCard,
      handleDeleteCard: handleDeleteCard,
    },
    userInfo.getUserId()
  );

  return newCard.generateCard();
}

// Функции коллбэки для класса Card
// Функция лайка
// Если пользователь поставил лайк, то при клике удаляем
function handleLikeCard(card) {
  if (card.hasLike()) {
    api
      .deleteLike(card.getCardID())
      .then((cardInfo) => {
        card.updateLikesCounter(cardInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    api
      .like(card.getCardID())
      .then((cardInfo) => {
        card.updateLikesCounter(cardInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
// Перезаписываем обработчик в popupDelete
function handleDeleteCard(card) {
  popupDelete.open();
  popupDelete.overwriteDeleteHandler(() => {
    popupDelete.renderLoading(true);
    api
      .deleteCard(card.getCardID())
      .then(() => {
        card.handleDeleteButton();
      })
      .then(() => {
        popupDelete.close();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        popupDelete.renderLoading(false);
      });
  });
}

// Обработчики для кнопок попапов
buttonEditInfo.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  inputNamePopupInfo.value = userInfoData.name;
  inputAboutPopupInfo.value = userInfoData.about;
  popupInfoUser.open();
  profileFormValidator.resetErrors();
});
buttonAddCard.addEventListener('click', () => {
  popupAdd.open();
  addCardFormValidator.resetErrors();
});
buttonEditAvatar.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidator.resetErrors();
});
