'use client'
import React, { useState } from 'react'
import '../styles/styles.css'


const Card = () => {
    const [isLight, setLight] = useState(true);

    const toggleLight = () => {
      setLight(!isLight);
    }
    
  return (
    <div>card</div>
  )
}

export default Card