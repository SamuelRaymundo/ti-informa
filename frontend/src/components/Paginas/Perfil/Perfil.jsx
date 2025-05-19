import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './perfil.module.css';
import { HiChevronDown, HiCog, HiPlus } from 'react-icons/hi';
import Layout from '../../Layout/Layout';
import axios from '../../../api/axios-config';

const AddToPlaylistButton = ({ videoId, playlists }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!selectedPlaylist) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/auth/playlist/${selectedPlaylist}/adicionar-video`,
        null,
        {
          params: { videoId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Vídeo adicionado à playlist!');
      setShowSelect(false);
    } catch {
      alert('Erro ao adicionar vídeo à playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={styles.botaoAdicionarPlaylist}
        onClick={() => setShowSelect(!showSelect)}
      >
        Adicionar à Playlist
      </button>
      {showSelect && (
        <div>
          <select
            value={selectedPlaylist}
            onChange={e => setSelectedPlaylist(e.target.value)}
          >
            <option value="">Selecione uma playlist</option>
            {playlists.map(pl => (
              <option key={pl.id_playlist || pl.id} value={pl.id_playlist || pl.id}>
                {pl.nome}
              </option>
            ))}
          </select>
          <button onClick={handleAdd} disabled={!selectedPlaylist || loading}>
            {loading ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      )}
    </div>
  );
};

const Perfil = () => {
  const [descricaoUsuario, setDescricaoUsuario] = useState('');
  const [videosUsuario, setVideosUsuario] = useState([]);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCriador, setIsCriador] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [novaPlaylistNome, setNovaPlaylistNome] = useState('');
  const [secoesAtivas, setSecoesAtivas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const headers = { Authorization: `Bearer ${token}` };

    const carregarDados = async () => {
      try {
        const response = await axios.get('/auth/me', { headers });
        setNomeCompleto(response.data.nome);
        setEmailUsuario(response.data.email);
        setIsCriador(response.data.isCriador || false);

        if (response.data.isCriador) {
          setSecoesAtivas(['videos', 'playlists']);
          try {
            const videosResponse = await axios.get('/file/meus-videos', { headers });
            setVideosUsuario(Array.isArray(videosResponse.data) ? videosResponse.data : []);
          } catch (error) {
            setVideosUsuario([]);
            if (error.response?.status !== 403) {
              setError('Erro ao buscar vídeos do usuário.');
            }
          }
        } else {
          setSecoesAtivas(['playlists']);
          setVideosUsuario([]);
        }
      } catch (error) {
        setError('Erro ao carregar os dados do perfil.');
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('nomeCompleto');
          localStorage.removeItem('email');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }

      try {
        setLoadingPlaylists(true);
        const res = await axios.get('/auth/minhas-playlists', { headers });
        setPlaylists(res.data);
      } catch {
        setError('Erro ao buscar playlists do usuário.');
      } finally {
        setLoadingPlaylists(false);
      }
    };

    carregarDados();
  }, [navigate]);

  const aoClicarEditar = () => {};
  const aoClicarSair = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nomeCompleto');
    localStorage.removeItem('email');
    navigate('/login');
  };
  const aoClicarAdicionarVideo = () => {
    navigate('/upload-video');
  };

  const criarPlaylist = async () => {
    const token = localStorage.getItem('token');
    if (!novaPlaylistNome.trim()) {
      alert('Por favor, insira um nome para a playlist');
      return;
    }
    
    try {
      setLoadingPlaylists(true);
      const res = await axios.post(
        '/auth/criar-playlist',
        { nome: novaPlaylistNome, visibilidade: 'PRIVADA' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlaylists([...playlists, res.data]);
      setNovaPlaylistNome('');
      alert('Playlist criada com sucesso!');
    } catch (error) {
      alert('Erro ao criar playlist: ' + (error.response?.data?.message || 'Tente novamente mais tarde'));
    } finally {
      setLoadingPlaylists(false);
    }
  };

  const videosOrdenados = [...videosUsuario].sort((a, b) => {
    return new Date(b.dataPublicacao) - new Date(a.dataPublicacao);
  });

  const alternarSecao = idSecao => {
    setSecoesAtivas(prev =>
      prev.includes(idSecao)
        ? prev.filter(id => id !== idSecao)
        : [...prev, idSecao]
    );
  };

  const secoesBase = [
    {
      id: 'playlists',
      titulo: 'Suas playlists',
      conteudo: (
        <div>
          <div className={styles.containerNovaPlaylist}>
            <input
              type="text"
              className={styles.inputNovaPlaylist}
              placeholder="Nome da nova playlist"
              value={novaPlaylistNome}
              onChange={e => setNovaPlaylistNome(e.target.value)}
            />
            <button 
              className={styles.botaoNovaPlaylist} 
              onClick={criarPlaylist}
              disabled={loadingPlaylists}
            >
              {loadingPlaylists ? 'Criando...' : 'Nova Playlist'}
            </button>
          </div>
          {loadingPlaylists ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Carregando playlists...</p>
            </div>
          ) : (
            <div className={styles.listaPlaylistsGrid}>
              {playlists.length === 0 && <p>Você não possui playlists.</p>}
              {playlists.map(playlist => (
                <div
                  key={playlist.id_playlist || playlist.id}
                  className={styles.playlistCard}
                  onClick={() => navigate(`/playlist/${playlist.id_playlist || playlist.id}`, { state: { playlist }})}
                >
                  <h4>{playlist.nome}</h4>
                  <p>Visibilidade: {playlist.visibilidade}</p>
                  <p>{playlist.videos?.length || 0} vídeos</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'interesses',
      titulo: 'Interesses',
      subSecoes: ['Interesse 1', 'Interesse 2', 'Interesse 3'],
    },
  ];

  const secaoVideos = {
    id: 'videos',
    titulo: 'Seus vídeos',
    conteudo: (
      <div>
        <div className={styles.containerAdicionarVideo}>
          <button className={styles.botaoAdicionarVideo} onClick={aoClicarAdicionarVideo}>
            <HiPlus /> Adicionar novo vídeo
          </button>
        </div>
        <div className={styles.listaVideos}>
        {Array.isArray(videosOrdenados) && videosOrdenados.map((video, index) => (
          <div key={index} className={styles.itemVideo}>
            <h3 className={styles.nomeArquivo}>{video.titulo}</h3>
            <div className={styles.videoContainer}>
              <video
                controls
                className={styles.videoPlayer}
                width="320"
                height="180"
                onError={(e) => {
                  console.error("Erro detalhado:", {
                    videoKey: video.key,
                    fullUrl: `https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/${video.key}`,
                    errorEvent: e.nativeEvent
                  });
                  
                  const errorContainer = e.target.parentNode;
                  errorContainer.innerHTML = `
                    <div class="${styles.videoError}">
                      <p>Erro ao carregar o vídeo</p>
                      <p>Título: ${video.titulo}</p>
                      <p>Key: ${video.key}</p>
                      <a href="https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/${video.key}" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        Testar URL diretamente
                      </a>
                    </div>
                  `;
                }}
              >
                <source
                  src={`https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/${video.key}`}
                  type="video/mp4"
                />
                Seu navegador não suporta vídeos HTML5.
              </video>
            </div>
            <AddToPlaylistButton videoId={video.id_video} playlists={playlists} />
          </div>
        ))}
      </div>
      </div>
    ),
  };

  const secoesFiltradas = isCriador
    ? [secaoVideos, ...secoesBase]
    : [...secoesBase];

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Carregando dados do perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Layout />
      <div className={styles.container}>
        <div className={styles.cartaoPerfil}>
          <img
            src="https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785374-stock-illustration-hand-drawn-modern-man-avatar.jpg"
            alt="Foto de Perfil"
            className={styles.imagemPerfil}
          />
          <div className={styles.infoPerfil}>
            <h2 className={styles.nomeUsuario}>{nomeCompleto}</h2>
            <p className={styles.emailUsuario}>{emailUsuario}</p>
            <textarea
              className={styles.descricaoUsuario}
              placeholder="Descrição do usuário."
              value={descricaoUsuario}
              onChange={e => setDescricaoUsuario(e.target.value)}
            />
            {isCriador ? (
              <p className={styles.tipoUsuario}>Criador de Conteúdo</p>
            ) : (
              <p className={styles.tipoUsuario}>Usuário</p>
            )}
            <p className={styles.assinatura}>Assinatura</p>
          </div>
          <HiCog className={styles.iconeConfiguracoes} onClick={() => navigate('/config')} />
          <div className={styles.botoesContainer}>
            <button className={styles.botaoEditar} onClick={aoClicarEditar}>
              Editar
            </button>
            {!isCriador && (
              <button
                className={styles.botaoRegister}
                onClick={() => navigate('/RegisterCriador')}
              >
                Registrar para ser criador
              </button>
            )}
          </div>
        </div>
        <div className={styles.linksNavegacao}>
          {secoesFiltradas.map(secao => (
            <div
              key={secao.id}
              className={`${styles.secao} ${secoesAtivas.includes(secao.id) ? styles.aberta : ''}`}
            >
              <p onClick={() => alternarSecao(secao.id)}>
                {secao.titulo} <HiChevronDown />
              </p>
              <div
                className={`${styles.conteudoSecao} ${
                  secoesAtivas.includes(secao.id) ? styles.aberta : ''
                }`}
              >
                {secao.conteudo}
              </div>
            </div>
          ))}
        </div>
        <button className={styles.botaoSair} onClick={aoClicarSair}>
          Sair da conta
        </button>
      </div>
    </div>
  );
};

export default Perfil;