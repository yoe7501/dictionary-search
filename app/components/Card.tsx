'use client'
import React, { useState } from 'react'
import '../styles/styles.css'


const Card = () => {
    const [isLight, setLight] = useState(true);

    const toggleLight = () => {
      setLight(!isLight);
    }
    
  return (
    <div className={`${isLight? "light": "dark"} big`}> 
    <div className="container">
        <div className='top'>
            <img src="/images/logo.svg" alt="logo" />
            <button onClick={toggleLight}><img src="/images/icon-moon.svg" alt="" /></button>
        </div>

    </div>
    </div>
  )
}

export default Card