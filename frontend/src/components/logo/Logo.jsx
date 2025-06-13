import React from 'react'
import logo from "../../assets/images/1.png"
import styles from "./Logo.module.css"

const Logo = () => {
  return (
    <div className={styles.logo}><img src={logo} alt="" /></div>
  )
}

export default Logo