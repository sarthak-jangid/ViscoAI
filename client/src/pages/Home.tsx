import Hero from '../components/Hero'
import Features from '../components/features'
import Pricing from '../components/Pricing'
import CtaBanner from '../components/CtaBanner'

function Home() {
  return (
    <div className='mx-auto min-h-screen' >
      <Hero />
      <Features />
      <Pricing />
      <CtaBanner />
    </div>
  )
}

export default Home
