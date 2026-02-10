import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Preloader from './components/ui/Preloader'
import ScrollToTop from './components/utils/ScrollToTop'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Africa from './pages/Africa'
import Search from './pages/Search'
import Database from './pages/Database'
import Analysis from './pages/Analysis'
import Token from './pages/Token'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function App() {
  const [loading, setLoading] = useState(true)
  const [showPreloader, setShowPreloader] = useState(true)

  const handlePreloaderComplete = () => {
    setLoading(false)
    // Small delay before hiding to ensure smooth transition
    setTimeout(() => setShowPreloader(false), 100)
  }

  return (
    <>
      <ScrollToTop />
      {showPreloader && loading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/africa" element={<Africa />} />
          <Route path="/search" element={<Search />} />
          <Route path="/database" element={<Database />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/token" element={<Token />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
