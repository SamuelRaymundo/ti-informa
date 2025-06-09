import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PlaylistView.module.css';
import Layout from '../../Layout/Layout';
import axios from '../../../api/axios-config';

const PlaylistView = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/playlists/${playlistId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setPlaylist(response.data);
      } catch (err) {
        setError('Erro ao carregar playlist');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const getThumbnailSource = (video) => {
    const s3BaseUrl = 'https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/';
    if (video?.thumbnail) {
      return `${s3BaseUrl}${video.thumbnail}`;
    }
    if (video?.key) {
      return `${s3BaseUrl}${video.key}`;
    }
    return 'https://placehold.co/300x169?text=Thumbnail+Indispon%C3%ADvel';
  };

  const handleVideoClick = (video) => {
    navigate(`/playlist/${playlistId}/video/${video.videoId}`, {
      state: { 
        video,
        fromPlaylist: true, 
        playlistId 
      }
    });
  };

  if (loading) return (
    <div className={styles.container}>
      <Layout />
      <div className={styles.loading}>Carregando...</div>
    </div>
  );

  if (error) return (
    <div className={styles.container}>
      <Layout />
      <div className={styles.error}>{error}</div>
    </div>
  );

  if (!playlist) return (
    <div className={styles.container}>
      <Layout />
      <div className={styles.error}>Playlist não encontrada</div>
    </div>
  );

  return (
    <div>
      <Layout />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.tituloPlaylist}>{playlist.nome}</h1>
          <div className={styles.visibilidade}>
            {playlist.visibilidade === 'PUBLICA' ? 'PÚBLICA' : 'PRIVADA'}
          </div>
        </div>
        
        <div className={styles.listaVideos}>
          {playlist.videos && playlist.videos.length > 0 ? (
            playlist.videos.map((video, index) => (
              <div 
                key={`${video.id || video.idVideo || index}`} 
                className={styles.itemVideo}
                onClick={() => handleVideoClick(video)}
              >
                <h3 className={styles.tituloVideo}>
                  {video.titulo || video.videoTitulo || `Vídeo ${index + 1}`}
                </h3>
                <img 
                  src={getThumbnailSource(video)} 
                  alt={video.titulo} 
                  className={styles.thumbnail}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/300x169?text=Thumbnail+Indispon%C3%ADvel';
                  }}
                />
              </div>
            ))
          ) : (
            <div className={styles.emptyPlaylist}>
              <p>Esta playlist está vazia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;