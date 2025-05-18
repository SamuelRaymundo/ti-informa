import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PlaylistView.module.css';
import Layout from '../../Layout/Layout';
import axios from '../../../api/axios-config';

const PlaylistView = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`/auth/minhas-playlists`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const found = res.data.find(pl => pl.id_playlist === Number(playlistId) || pl.id === Number(playlistId));
      setPlaylist(found);
    });
  }, [playlistId]);

  if (!playlist) return (
      <div className={styles.container}>Carregando...</div>
  );

  return (
    <div>
    <Layout/>
      <div className={styles.container}>
        <div className={styles.tituloPlaylist}>{playlist.nome}</div>
        <div className={styles.visibilidade}>Visibilidade: {playlist.visibilidade}</div>
        <div className={styles.listaVideos}>
          {playlist.videos && playlist.videos.length > 0 ? (
            playlist.videos.map(video => (
              <div key={video.idVideo} className={styles.itemVideo}>
                <p className={styles.tituloPlaylistVideo}>{video.videoTitulo}</p>
                {video.videoKey && (
                  <div className={styles.videoPlayerWrapper}>
                    <video controls className={styles.videoPlayer}>
                      <source src={`https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/${video.videoKey}`} type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Playlist vazia</p>
          )}
        </div>
      </div>
      </div>
  );
};

export default PlaylistView;