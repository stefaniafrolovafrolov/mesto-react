import React, { useEffect, useState } from "react"
import api from "../utils/Api"
import Card from "./Card"
import profileEditAvatar from "../images/profile__edit-avatar.svg"

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("")
  const [userDescription, setUserDescription] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [cards, getInitialCards] = useState([])

  useEffect(() => {
    api
      .getRealUserInfo()
      .then((profileUserInfo) => {
        setUserName(profileUserInfo.name)
        setUserDescription(profileUserInfo.about)
        setUserAvatar(profileUserInfo.avatar)
      })
      .catch((error) => console.log(`Ошибка: ${error}`))

    api
      .getInitialCards()
      .then((cardsData) => {
        getInitialCards(
          cardsData.map((data) => ({
            likes: data.likes,
            name: data.name,
            link: data.link,
            cardId: data._id,
          }))
        )
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__wrapper-relative">
            <img
              className="profile__avatar"
              src={userAvatar}
              alt="Изображенна фото Жак-Ив Кусто в красной шапке"
            />
            <button
              className="profile__edit-avatar"
              type="button"
              onClick={() => {
                onEditAvatar(true)
              }}
            >
              <img
                className="profile__edit-pen"
                src={profileEditAvatar}
                alt="изображение письменной ручки"
              />
            </button>
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => {
              onEditProfile(true)
            }}
          ></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            onAddPlace(true)
          }}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card.cardId}
            likes={card.likes}
            name={card.name}
            link={card.link}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
