import React from "react"
import { useState, useEffect } from "react"
import Header from "./Header"
import Main from "./Main"
import CurrentUserContext from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"
import api from "../utils/Api"
import Footer from "./Footer"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [cards, setCards] = useState([])

  useEffect(() => {
    api
      .getRealUserInfo()
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((err) => console.log(err))

    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        )
      })
      .catch((err) => console.log(err))
  }, [])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true)
    api
      .updateProfileUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true)
    api
      .editProfileUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)
    console.log(isLiked)
    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((err) => console.log(err))
    } else {
      api
        .addLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((err) => console.log(err))
    }
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditProfile={setIsEditProfilePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onCardDelete={handleCardDelete}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            cards={cards}
          />
          <Footer />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <PopupWithForm
            name="popupConfirmation"
            title="Вы уверены?"
            buttonText="Да"
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
