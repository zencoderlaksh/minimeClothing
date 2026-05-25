import React from 'react'
import Intro from './components/Intro'
import Category from './components/Category'
import Details from './components/Details'
import Social from './components/Social'
import Cards from './components/Cards'
const Home = () => {
  return (
    <div>
      <Intro />
      <Category />
      <Cards />
      <Details />
      <Social />
    </div>
  )
}

export default Home