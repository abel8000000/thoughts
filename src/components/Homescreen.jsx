import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Music from './Music';
import Movies from './Movies';
import '../styles/Homescreen.css';

const Homescreen = () => {
    return (
        <div id='homescreen'>
            <Routes>
            <Route path="/music/:album" element={<Music />} />
            <Route path="/music" element={<Music />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/" element={
              <>
                <h2 id='welcome-text'>welcome</h2>
                <p>select one of the tabs, click on the title to go back to this homescreen</p>
              </>
            } />
          </Routes>
        </div>
    );
};

export default Homescreen;