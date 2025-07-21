import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffer from '../components/ExclusiveOffer'
import React from 'react'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Hero/>
      <FeaturedDestination />
      <ExclusiveOffer/>
      <Testimonial/>
      <NewsLetter/>
      <Footer/>
    </>
  )
}

export default Home