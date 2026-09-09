import { Routes, Route, Link } from 'react-router-dom'
import StyleGuide from './pages/StyleGuide'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-display text-crimson-bright underline">Get started with Graveyard Cinema</h1>
          <Link to="/style-guide" className="text-text-bright underline hover:text-crimson">View Style Guide</Link>
        </div>
      } />
      <Route path="/style-guide" element={<StyleGuide />} />
    </Routes>
  )
}

export default App
