import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './perfil.module.css';
import { HiChevronDown, HiCog, HiPlus } from 'react-icons/hi';
import Menu from '../../Menu/Menu';

const Perfil = () => {
  const [descricaoUsuario, setDescricaoUsuario] = useState('');
  const [arquivoVideo, setArquivoVideo] = useState(null);
  const [videosUsuario, setVideosUsuario] = useState([]);
  const navigate = useNavigate(); 

  const aoClicarEditar = () => {
    console.log('Editar perfil clicado');
  };

  const aoClicarSair = () => {
    console.log('Sair da conta clicado');
  };

  const aoSelecionarVideo = (event) => {
    const file = event.target.files[0];
    setArquivoVideo(file);
  };

  const aoEnviarVideo = async () => {
    if (arquivoVideo) {
      const formData = new FormData();
      formData.append('video', arquivoVideo);
      try {
        console.log('Arquivo enviado:', arquivoVideo.name);
        setVideosUsuario([...videosUsuario, { name: arquivoVideo.name, type: arquivoVideo.type }]);
        setArquivoVideo(null);
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
      }
    } else {
      alert('Por favor, selecione um arquivo de vídeo.');
    }
  };

  const secoes = [
    {
      id: 'videos',
      titulo: 'Seus vídeos',
      conteudo: (
        <div>
          <div className={styles.containerAdicionarVideo}>
            <input
              type="file"
              className={styles.inputAdicionarVideo}
              accept="video/mp4, audio/mpeg"
              onChange={aoSelecionarVideo}
            />
            <button className={styles.botaoAdicionarVideo} onClick={aoEnviarVideo} disabled={!arquivoVideo}>
              <HiPlus /> Enviar arquivo
            </button>
          </div>
          <div className={styles.listaVideos}>
            {videosUsuario.map((video, index) => (
              <div key={index} className={styles.itemVideo}>
                {video.type.startsWith('video/') && (
                  <video controls className={styles.videoPlayer}>
                    <source src={`/uploads/${video.name}`} type={video.type} />
                    Seu navegador não suporta vídeos HTML5.
                  </video>
                )}
                {video.type.startsWith('audio/') && (
                  <audio controls className={styles.audioPlayer}>
                    <source src={`/uploads/${video.name}`} type={video.type} />
                    Seu navegador não suporta áudio HTML5.
                  </audio>
                )}
                <p className={styles.nomeArquivo}>{video.name}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'playlists',
      titulo: 'Suas playlists',
      subSecoes: ['Playlist 1', 'Playlist 2', 'Playlist 3'],
    },
    {
      id: 'interesses',
      titulo: 'Interesses',
      subSecoes: ['Interesse 1', 'Interesse 2', 'Interesse 3'],
    },
  ];

  const [secoesAtivas, setSecoesAtivas] = useState(['videos']);

  const alternarSecao = (idSecao) => {
    setSecoesAtivas((prevSecoesAtivas) =>
      prevSecoesAtivas.includes(idSecao)
        ? prevSecoesAtivas.filter((id) => id !== idSecao)
        : [...prevSecoesAtivas, idSecao]
    );
  };

  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <div className={styles.cartaoPerfil}>
          <img
            src="https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785374-stock-illustration-hand-drawn-modern-man-avatar.jpg"
            alt="Foto de Perfil"
            className={styles.imagemPerfil}
          />
          <div className={styles.infoPerfil}>
            <h2 className={styles.nomeUsuario}>Nome de Usuário</h2>
            <p className={styles.emailUsuario}>email@usuario.com</p>
            <textarea
              className={styles.descricaoUsuario}
              placeholder="Descrição do usuário."
              value={descricaoUsuario}
              onChange={(e) => setDescricaoUsuario(e.target.value)}
            />
            <p className={styles.assinatura}>Assinatura</p>
          </div>
          <HiCog
            className={styles.iconeConfiguracoes}
            onClick={() => (window.location.href = '/config')}
          />
          <div className={styles.botoesContainer}>
            <button className={styles.botaoEditar} onClick={aoClicarEditar}>
              Editar
            </button>
            <button className={styles.botaoRegister} onClick={() => navigate('/RegisterCriador')}> 
              Registrar para ser criador
            </button>
          </div>
        </div>

        <div className={styles.linksNavegacao}>
          {secoes.map((secao) => (
            <div
              key={secao.id}
              className={`${styles.secao} ${
                secoesAtivas.includes(secao.id) ? styles.aberta : ''
              }`}
            >
              <p onClick={() => alternarSecao(secao.id)}>
                {secao.titulo} <HiChevronDown />
              </p>
              <div
                className={`${styles.conteudoSecao} ${
                  secoesAtivas.includes(secao.id) ? styles.aberta : ''
                }`}
              >
                {secao.conteudo ? secao.conteudo : (
                  <div className={styles.containerSubSecoes}>
                    {secao.subSecoes && secao.subSecoes.map((subSecao, index) => (
                      <p key={index}>{subSecao}</p>
                    ))}
                  </div>
                )}
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
