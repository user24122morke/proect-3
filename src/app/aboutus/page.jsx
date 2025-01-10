"use client"

// pages/about-us.js
import React from 'react';
import MainSection from './components/MainSection';
import Navbar from '../components/HomeComponents/Navbar';
import Footer from '../components/HomeComponents/Footer';
import OurMission from './components/OurMission'
import TeamTechnology from './components/TeamTechnology'
import OurOtherTechnology from './components/OurOtherProduct'
const AboutUs = () => {
  return (
    <div >
        <Navbar/>
        <MainSection/>
        <OurMission/>
        <TeamTechnology/>
        <OurOtherTechnology/>
        <Footer/>
    </div>
  );
};

export default AboutUs;
