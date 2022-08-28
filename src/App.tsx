import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './ui/layout/Layout'
import Home from './screens/home/Home'
import Projects from './screens/projects/Projects'
import Skills from './screens/skills/Skills'

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
