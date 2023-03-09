import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={setIsEditProfilePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onCardClick={setSelectedCard}
        />
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_name"
              type="text"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              name="name"
              id="nameInput"
              required
            />
            <span className="nameInput-error error" />
          </label>
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_job"
              type="text"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              name="about"
              id="jobInput"
              required
            />
            <span className="jobInput-error error" />
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="photo"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_image-name"
              type="text"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              name="name"
              id="nameInputNew"
              required
            />
            <span className="nameInputNew-error error" />
          </label>
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_image-link"
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              id="linkInputNew"
              required
            />
            <span className="linkInputNew-error error" />
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              name="avatar"
              className="popup__input popup__input_type_link-avatar"
              id="nameInputAvatar"
              type="url"
              placeholder="Введите ссылку URL"
              required
            />
            <span className="nameInputAvatar-error error" />
          </label>
        </PopupWithForm>
      </div>
    </div>
  )
}

export default App
