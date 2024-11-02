import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/Music.css';

// Dynamically require all markdown files and cover images from the public/music directory
const markdownFiles = require.context('../../public/music', true, /\.md$/);
const coverImages = require.context('../../public/music', true, /cover\.(jpg|jpeg|png)$/);

function Music() {
  const [content, setContent] = useState('');
  const { album } = useParams();

  const albums = markdownFiles.keys().map((file) => {
    const albumName = file.split('/')[1];
    const cover = coverImages.keys().find((coverFile) => coverFile.includes(albumName));
    return {
      name: albumName,
      title: albumName,
      cover: cover ? `${process.env.PUBLIC_URL}/music/${albumName}/${cover.split('/').pop()}` : null,
    };
  });

  useEffect(() => {
    if (album) {
      const markdownFile = markdownFiles.keys().find((file) => file.includes(album));
      if (markdownFile) {
        const filePath = `${process.env.PUBLIC_URL}/music/${album}/${markdownFile.split('/').pop()}`;
        fetch(filePath)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((text) => setContent(text))
          .catch((err) => console.error('Failed to fetch markdown file:', err));
      }
    }
  }, [album]);

  return (
    <div id="music">
      {album ? (
        <ReactMarkdown>{content}</ReactMarkdown>
      ) : (
        <div>
          <h2>Albums</h2>
          <ul className="album-grid">
            {albums.map((album) => (
              <li key={album.name} className="album-item">
                <Link to={`/music/${album.name}`}>
                  {album.cover && <img src={album.cover} alt={`${album.title} cover`} width="100" />}
                  <p className='anchor'>{album.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Music;