import React from 'react'
import AboutHero from '../components/AboutHero'
import AboutFeatures from '../components/AboutFeatures'
import AboutCTA from '../components/AboutCTA'

const About = () => {
  return (
    <div className='bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A]'>
        <AboutHero/>
        <AboutFeatures/>
        <AboutCTA/>
    </div>
  )
}

export default About