import React from "react"

function Card(card) {
  function handleCardClick() {
    card.onCardClick(card)
  }

  return (
    <div className="element rotation">
      <button className="element__trash" type="button"></button>
      <img
        className="element__mask"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-like">
          <button className="element__like-button" type="button"></button>
          <p className="element__count-like">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
