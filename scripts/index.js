let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let inputName = document.querySelector(".popup__input-text_type_name");
let actualName = document.querySelector(".profile__user-name");
let inputAbout = document.querySelector(".popup__input-text_type_job");
let actualAbout = document.querySelector(".profile__user-describe");

function openPopup() {
  popup.classList.add("popup_opened");

  inputName.setAttribute("value", actualName.textContent);
  inputAbout.setAttribute("value", actualAbout.textContent);
}

let exitButton = document.querySelector(".popup__exit");

function closePopup() {
  popup.classList.remove("popup_opened");
}

let formElement = document.querySelector(".popup__form");

function handleFormSubmit(evt) {
  evt.preventDefault();

  actualName.textContent = inputName.value;
  actualAbout.textContent = inputAbout.value;

  closePopup();
}

exitButton.addEventListener("click", closePopup);
editButton.addEventListener("click", openPopup);
formElement.addEventListener("submit", handleFormSubmit);
