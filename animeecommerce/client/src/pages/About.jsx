import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
  <Layout title={'About Us -True Anime'}>
    <h1>About</h1>
  </Layout>
  )
}

Layout.defaultProps ={
  title:'True Anime - Buy Now',
  description: 'Ecommerce Site for Anime Clothing',
  keywords:'anime , clothing , merch',
  author:'Darshan Jain'
}

export default About