import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Preloader from './components/ui/Preloader'
import ScrollToTop from './components/utils/ScrollToTop'

// Main pages
import Home from './pages/Home'
import Explore from './pages/Explore'
import Africa from './pages/Africa'
import Search from './pages/Search'
import Database from './pages/Database'
import Detail from './pages/Detail'
import Analysis from './pages/Analysis'
import NFTGallery from './pages/NFTGallery'
import Token from './pages/Token'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

// Database sub-pages
import Funding from './pages/database/Funding'
import Remittances from './pages/database/Remittances'
import Organizations from './pages/database/Organizations'
import Scholarships from './pages/database/Scholarships'
import Businesses from './pages/database/Businesses'
import Officials from './pages/database/Officials'
import Timeline from './pages/database/Timeline'

// Political sub-pages
import Senators from './pages/political/Senators'
import Representatives from './pages/political/Representatives'
import Mayors from './pages/political/Mayors'
import HistoricalFirsts from './pages/political/HistoricalFirsts'

// Analysis sub-pages
import MigrationRoutes from './pages/analysis/MigrationRoutes'
import DiasporaCommunities from './pages/analysis/DiasporaCommunities'

// Crowdsourcing sub-pages
import DataRequests from './pages/crowdsourcing/DataRequests'
import SubmitData from './pages/crowdsourcing/SubmitData'
import Leaderboard from './pages/crowdsourcing/Leaderboard'

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
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/africa" element={<Africa />} />
          <Route path="/search" element={<Search />} />
          <Route path="/database" element={<Database />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/nfts" element={<NFTGallery />} />
          <Route path="/token" element={<Token />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Database sub-routes */}
          <Route path="/database/funding" element={<Funding />} />
          <Route path="/database/remittances" element={<Remittances />} />
          <Route path="/database/organizations" element={<Organizations />} />
          <Route path="/database/scholarships" element={<Scholarships />} />
          <Route path="/database/businesses" element={<Businesses />} />
          <Route path="/database/officials" element={<Officials />} />
          <Route path="/database/timeline" element={<Timeline />} />

          {/* Political sub-routes */}
          <Route path="/political/senators" element={<Senators />} />
          <Route path="/political/representatives" element={<Representatives />} />
          <Route path="/political/mayors" element={<Mayors />} />
          <Route path="/political/firsts" element={<HistoricalFirsts />} />

          {/* Analysis sub-routes */}
          <Route path="/analysis/routes" element={<MigrationRoutes />} />
          <Route path="/analysis/communities" element={<DiasporaCommunities />} />

          {/* Crowdsourcing sub-routes */}
          <Route path="/crowdsourcing/requests" element={<DataRequests />} />
          <Route path="/crowdsourcing/submit" element={<SubmitData />} />
          <Route path="/crowdsourcing/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
