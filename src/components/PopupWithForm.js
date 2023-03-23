import React from "react"

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onSubmit,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save popup__save_disabled" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
