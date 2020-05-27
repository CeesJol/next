import React from "react"
import Link from 'next/link'

const Header = ({ transparent = true }) => (
	<header 
		className={transparent ? 'header header--transparent' : 'header'}
	>
    <div className="header__left">
      <h3>
        <Link className="header__title" href="/">
          Project name
        </Link>
      </h3>
    </div>
    <div className="header__right">
      <h3>
        <Link href="/login">
          Log in
        </Link>
      </h3>
    </div>
  </header>
)

export default Header
