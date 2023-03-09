import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({})

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onCardClick={setSelectedCard}
        />
        <Footer />

        <PopupWithForm
          name="popupEditProfile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_name"
              id="nameInput"
              name="name"
              type="text"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="nameInput-error error" />
          </label>
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_job"
              id="jobInput"
              name="about"
              type="text"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="jobInput-error error" />
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="popupNewPlace"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_image-name"
              id="nameInputNew"
              name="name"
              type="text"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="nameInputNew-error error" />
          </label>
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_image-link"
              id="linkInputNew"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="linkInputNew-error error" />
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="popupConfirmation"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>

        <PopupWithForm
          name="popupEditAvatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_link-avatar"
              id="nameInputAvatar"
              name="avatar"
              type="url"
              placeholder="Введите ссылку URL"
              required
            />
            <span className="nameInputAvatar-error error" />
          </label>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  )
}

export default App
