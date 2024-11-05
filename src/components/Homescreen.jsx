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
                <p>this is a place where i leave a little bit of my soul available on the web for you to enjoy.</p>
                <p>select one of the tabs, click on the title to go back to this homescreen.</p>
                <h3>thank you</h3>
              </>
            } />
          </Routes>
        </div>
    );
};

export default Homescreen;