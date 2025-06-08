import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PlaylistView.module.css';
import Layout from '../../Layout/Layout';
import axios from '../../../api/axios-config';

const PlaylistView = () => {
  const { playlistId } = useParams();
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
        
        console.log('Dados da playlist:', response.data);
        
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

  const renderVideoPlayer = (video) => {
    const videoKey = video.key || video.videoKey || video.id;
    
    if (!videoKey) {
      console.warn('Vídeo sem chave:', video);
      return (
        <div className={styles.videoPlaceholder}>
          Vídeo não disponível
        </div>
      );
    }

    const videoUrl = `https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/${videoKey}`;
    
    return (
      <div className={styles.videoPlayerWrapper}>
        <video controls className={styles.videoPlayer}>
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
      </div>
    );
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
              >
                <h3 className={styles.tituloVideo}>
                  {video.titulo || video.videoTitulo || `Vídeo ${index + 1}`}
                </h3>
                {renderVideoPlayer(video)}
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