import React from "react"
import headerLogo from "../images/header-logo.svg"

function Header() {
  return (
    <div>
      <header className="header">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Надписть на логотипе Mesto Russia"
        />
      </header>
    </div>
  )
}

export default Header
