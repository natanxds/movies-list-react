import MovieCard from './components/MovieCard'
import './css/App.css'
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import { MovieProvider } from './context/MovieContext';

function App() {

  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}


export default App;
