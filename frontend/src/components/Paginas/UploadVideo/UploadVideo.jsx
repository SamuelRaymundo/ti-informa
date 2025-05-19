import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import styles from './uploadVideo.module.css';
import axios from '../../../api/axios-config';

const UploadVideo = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [palavrasChave, setPalavrasChave] = useState('');
    const [isEnviando, setIsEnviando] = useState(false);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const aoSelecionarArquivo = (event) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
          
          if (!validTypes.includes(file.type)) {
            setErro('Por favor, selecione um arquivo de vídeo válido (MP4, MOV, AVI)');
            return;
          }
          
          setVideoFile(file);
          setErro('');
        }
      };

    const aoEnviarVideo = async () => {
        if (!videoFile) {
            setErro('Selecione um arquivo de vídeo');
            return;
        }

        if (!titulo || !descricao) {
            setErro('Título e descrição são obrigatórios');
            return;
        }

        setIsEnviando(true);
        setErro('');

        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('titulo', titulo);
        formData.append('descricao', descricao);
        
        if (categoria) {
            formData.append('categoria', categoria);
        }

        const palavras = palavrasChave.split(',')
        .map(s => s.trim())
        .filter(s => s);
    
            if (palavras.length > 0) {
        formData.append('palavra_chave', JSON.stringify(palavras));
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data && response.data.includes("File uploaded")) {
                alert('Vídeo enviado com sucesso!');
                navigate('/perfil');
            } else {
                throw new Error('Resposta inesperada do servidor');
            }
        } catch (error) {
            console.error('Erro no upload:', error);
            setErro(error.response?.data?.message || 
                  error.message || 
                  'Erro ao enviar vídeo. Por favor, tente novamente.');
        } finally {
            setIsEnviando(false);
        }
    };

    return (
        <>
            <Layout />
            <div className={styles.container}>
                <div className={styles.uploadCard}>
                    <h1>Enviar Novo Vídeo</h1>
                    
                    {erro && <div className={styles.erroMensagem}>{erro}</div>}

                    <div className={styles.formGroup}>
                        <label htmlFor="videoFile">Selecionar Arquivo de Vídeo:</label>
                        <input 
                            type="file" 
                            id="videoFile" 
                            accept="video/mp4,video/quicktime,video/x-msvideo"
                            onChange={aoSelecionarArquivo}
                        />
                    </div>

                    {videoFile && (
                        <div className={styles.videoPreview}>
                            <p>Tamanho: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="titulo">Título:*</label>
                        <input
                            type="text"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Título do vídeo"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição:*</label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição do conteúdo"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="categoria">Categoria (opcional):</label>
                        <input
                            type="text"
                            id="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            placeholder="Ex: Educação, Tecnologia"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="palavrasChave">Palavras-chave:</label>
                        <input
                            type="text"
                            id="palavrasChave"
                            value={palavrasChave}
                            onChange={(e) => setPalavrasChave(e.target.value)}
                            placeholder="Separadas por vírgula (ex: Java, NoSQL)"
                        />
                    </div>

                    <button 
                        className={styles.enviarBotao} 
                        onClick={aoEnviarVideo}
                        disabled={isEnviando}
                    >
                        {isEnviando ? 'Enviando...' : 'Enviar Vídeo'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default UploadVideo;