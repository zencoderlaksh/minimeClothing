import React from 'react'
import Intro from './components/Intro'
import Category from './components/Category'
import Social from './components/Social'
import Cards from './components/Cards'
import ShopLook from './components/ShopLook'
const Home = () => {
  return (
    <div>
      <Intro />
      <Category />
      <Cards />
      <ShopLook /> 
      <Social />
    </div>
  )
}

export default Home