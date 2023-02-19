let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");

function openPopup() {
  popup.classList.add("popup_opened");
}

editButton.addEventListener("click", openPopup);

let exitButton = document.querySelector(".popup__exit");

function closePopup() {
  popup.classList.remove("popup_opened");
}

exitButton.addEventListener("click", closePopup);

let inputName = document.querySelector(".popup__input-text_type_name");
let actualName = document.querySelector(".profile__user-name");

inputName.setAttribute("value", actualName.textContent);

let inputAbout = document.querySelector(".popup__input-text_type_job");
let actualAbout = document.querySelector(".profile__user-describe");

inputAbout.setAttribute("value", actualAbout.textContent);

let formElement = document.querySelector(".popup__save-button");
function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = inputName.value;
  let job = inputAbout.value;

  actualName.textContent = name;
  actualAbout.textContent = job;

  closePopup();
}

formElement.addEventListener("click", handleFormSubmit);
