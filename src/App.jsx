import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Homescreen from './components/Homescreen';
import Music from './components/Music';
import Movies from './components/Movies';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <Link to="//" id='title'><h1>abel's thoughts</h1></Link>
      </header>
      <div id='tabs'>
        <Link to="/music/" className={`tab ${location.pathname.startsWith('/music') ? 'active' : ''}`}>music</Link>
        <Link to="/movies/" className={`tab ${location.pathname.startsWith('/movies') ? 'active' : ''}`}>movies</Link>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/music/:album" element={<Music />} />
          <Route path="/music" element={<Music />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;