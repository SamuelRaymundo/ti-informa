import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './perfil.module.css';
import { HiChevronDown, HiCog, HiPlus } from 'react-icons/hi';
import Layout from '../../Layout/Layout';
import axios from '../../../api/axios-config';

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
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setLoading(true);
        axios.get('/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                setNomeCompleto(response.data.nome);
                setEmailUsuario(response.data.email);
                setIsCriador(response.data.isCriador || false);
                setLoading(false);
                if (response.data.isCriador) {
                    axios.get('/auth/meus-videos', { headers: { 'Authorization': `Bearer ${token}` } })
                        .then(response => {
                            setVideosUsuario(Array.isArray(response.data) ? response.data : []);
                        })
                        .catch(error => {
                            setVideosUsuario([]);
                            if (error.response?.status !== 403) {
                                setError('Erro ao buscar vídeos do usuário.');
                            }
                        });
                } else {
                    setVideosUsuario([]);
                }
            })
            .catch(error => {
                setError('Erro ao carregar os dados do perfil.');
                setLoading(false);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('nomeCompleto');
                    localStorage.removeItem('email');
                    navigate('/login');
                }
            });

        setLoadingPlaylists(true);
        axios.get('/auth/minhas-playlists', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                setPlaylists(res.data);
                setLoadingPlaylists(false);
            })
            .catch(() => setLoadingPlaylists(false));
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

    const criarPlaylist = () => {
        const token = localStorage.getItem('token');
        if (!novaPlaylistNome.trim()) return;
        axios.post('/auth/criar-playlist', {
            nome: novaPlaylistNome,
            visibilidade: 'PRIVADO'
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            setPlaylists([...playlists, res.data]);
            setNovaPlaylistNome('');
        });
    };

    const secoes = [
        {
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
                        {Array.isArray(videosUsuario) && videosUsuario.map((video, index) => (
                            <div key={index} className={styles.itemVideo}>
                                <h3 className={styles.nomeArquivo}>{video.titulo}</h3>
                                <p className={styles.descricaoVideo}>{video.descricao}</p>
                                <video controls className={styles.videoPlayer} width="320" height="180">
                                    <source src={`https://tcc-fiec-ti-informa.s3.us-east-2.amazonaws.com/${video.key}`} type="video/mp4" />
                                    Seu navegador não suporta vídeos HTML5.
                                </video>
                            </div>
                        ))}
                        {Array.isArray(videosUsuario) && videosUsuario.length === 0 && <p>Nenhum vídeo enviado ainda.</p>}
                    </div>
                </div>
            ),
        },
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
                        <button className={styles.botaoNovaPlaylist} onClick={criarPlaylist}>
                            Nova Playlist
                        </button>
                    </div>
                    {loadingPlaylists ? (
                        <p>Carregando playlists...</p>
                    ) : (
                        <div className={styles.listaPlaylistsGrid}>
                            {playlists.length === 0 && <p>Você não possui playlists.</p>}
                            {playlists.map((playlist) => (
                                <div key={playlist.id} className={styles.playlistCard}>
                                    <h4>{playlist.nome}</h4>
                                    <p>Visibilidade: {playlist.visibilidade}</p>
                                    <div className={styles.playlistVideos}>
                                        {playlist.videos && playlist.videos.length > 0 ? (
                                            playlist.videos.map((video) => (
                                                <span key={video.idVideo} className={styles.videoTituloPlaylist}>
                                                    {video.videoTitulo}
                                                </span>
                                            ))
                                        ) : (
                                            <p>Vazia</p>
                                        )}
                                    </div>
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

    const [secoesAtivas, setSecoesAtivas] = useState(['videos']);
    const alternarSecao = (idSecao) => {
        setSecoesAtivas((prev) =>
            prev.includes(idSecao) ? prev.filter((id) => id !== idSecao) : [...prev, idSecao]
        );
    };

    if (loading) {
        return (
            <Layout>
                <div className={styles.container}>
                    <p>Carregando dados do perfil...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className={styles.container}>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            </Layout>
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
                            onChange={(e) => setDescricaoUsuario(e.target.value)}
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
                            <button className={styles.botaoRegister} onClick={() => navigate('/RegisterCriador')}>
                                Registrar para ser criador
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.linksNavegacao}>
                    {secoes.map((secao) => (
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