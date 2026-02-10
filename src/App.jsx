import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Africa from './pages/Africa'
import Search from './pages/Search'
import Database from './pages/Database'
import Token from './pages/Token'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/africa" element={<Africa />} />
        <Route path="/search" element={<Search />} />
        <Route path="/database" element={<Database />} />
        <Route path="/token" element={<Token />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Layout>
  )
}

export default App
