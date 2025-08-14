import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Home from './sections/Home'
import About from './sections/About'
import Work from './sections/Work'
import Contact from './sections/Contact'
import Menu from './components/ui/Menu'
// import BackgroundScene from './components/3d/BackgroundScene'
import OceanScene from './components/3d/BackgroundScene'
import './styles/main.scss'

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

function App() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <Canvas className="canvas" camera={{ position: [0, 0, 5], fov: 45 }}>
        <ScrollControls pages={4} damping={0.25}>
          {/* <BackgroundScene /> */}
          <OceanScene />
        </ScrollControls>
      </Canvas>

      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home setMenuOpen={setMenuOpen} />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default AppWrapper