import React from "react"
import Link from 'next/link'

export default ({ text }) => (
  <div className="button-container">
    <Link href="/login">
      <button className="button">{text ? text : "Start now"}</button>
    </Link>
  </div>
)
