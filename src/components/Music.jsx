import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import '../styles/Music.css';


const markdownFiles = require.context('../../public/music', true, /\.md$/);
const coverImages = require.context('../../public/music', true, /cover\.(jpg|jpeg|png)$/);

function Music() {
  const [content, setContent] = useState('');
  const { album } = useParams();

  // Convert album name to a slug with underscores
  const albums = markdownFiles.keys().map((file) => {
    const albumName = file.split('/')[1];
    const slug = albumName.replace(/\s+/g, '_'); // Replace spaces with underscores
    const cover = coverImages.keys().find((coverFile) => coverFile.includes(albumName));
    return {
      name: albumName, // original name for fetching
      slug,          // slug used in the URL
      title: albumName,
      cover: cover ? `${process.env.PUBLIC_URL}/music/${albumName}/${cover.split('/').pop()}` : null,
    };
  });

  useEffect(() => {
    if (album) {
      // Convert underscore back to space for matching the file name
      const albumName = album.replace(/_/g, ' ');
      const markdownFile = markdownFiles.keys().find((file) => file.includes(albumName));
      if (markdownFile) {
        const filePath = `${process.env.PUBLIC_URL}/music/${albumName}/${markdownFile.split('/').pop()}`;
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
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      ) : (
        <div>
          <h1 id='albums-title'>Albums</h1>
          <ul className="album-grid">
            {albums.map((album) => (
              <li key={album.name} className="album-item">
                <Link to={`/music/${album.slug}/`}>
                  {album.cover && <img src={album.cover} alt={`${album.title} cover`} width="100" />}
                  <p className='anchor'>{album.title}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="more-on-the-way">don't worry, (many) more on the way</div>
        </div>
      )}
    </div>
  );
}

export default Music;