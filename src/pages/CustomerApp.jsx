import { useState, useCallback } from 'react'
import { useDocumentHead } from '../utils/useDocumentHead.js'
import IntroScreen from '../components/IntroScreen.jsx'
import MainNav from '../components/MainNav.jsx'
import Hero from '../components/Hero.jsx'
import BestsellerCollections from '../components/BestsellerCollections.jsx'
import ShopForUnderSection from '../components/ShopForUnderSection.jsx'
import AboutBrandSection from '../components/AboutBrandSection.jsx'
import LegacySection from '../components/LegacySection.jsx'
import CollectionsSection from '../components/CollectionsSection.jsx'
import ShopBySection from '../components/ShopBySection.jsx'
import WorldSection from '../components/WorldSection.jsx'
import VideoSection from '../components/VideoSection.jsx'
import NewArrivalsStrip from '../components/NewArrivalsStrip.jsx'
import AssuranceSection from '../components/AssuranceSection.jsx'
import ExchangeSection from '../components/ExchangeSection.jsx'
import StoreSection from '../components/StoreSection.jsx'
import MainFooter from '../components/MainFooter.jsx'
import ChatWidget from '../components/ChatWidget.jsx'

export default function CustomerApp() {
  useDocumentHead({
    title: '',
    description: 'The House of Garg from Garg Jewellers — luxury gold and diamond jewellery in Chandigarh. Fine jewellery and haute couture. Sector 22, Chandigarh. Kharar coming soon.',
    path: '/',
  })
  const [introDone, setIntroDone] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!introDone && <IntroScreen onComplete={handleIntroComplete} />}
      <MainNav />
      <Hero />
      <BestsellerCollections />
      <ShopForUnderSection />
      <AboutBrandSection />
      <LegacySection />
      <CollectionsSection />
      <ShopBySection />
      <WorldSection />
      <VideoSection />
      <NewArrivalsStrip />
      <AssuranceSection />
      <ExchangeSection />
      <StoreSection />
      <MainFooter />
      <ChatWidget />
    </>
  )
}
