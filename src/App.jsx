import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

// Root shell. Routes mirror the target's page structure and will be
// fleshed out once the reference recording is reviewed.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
