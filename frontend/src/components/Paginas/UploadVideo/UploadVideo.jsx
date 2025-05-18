import React, { useState, useEffect } from 'react';
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
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, [navigate]);

    const aoSelecionarArquivo = (event) => {
        setVideoFile(event.target.files[0]);
    };

    const aoEnviarVideo = async () => {
        if (!videoFile) {
            alert('Selecione um arquivo de vídeo');
            return;
        }

        setIsEnviando(true);
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('titulo', titulo);
        formData.append('descricao', descricao);
        formData.append('categoria', categoria || '');

        const palavras = palavrasChave.split(',').map(s => s.trim()).filter(s => s);
        palavras.forEach(palavra => formData.append('palavraChave', palavra));

        try {
            const token = localStorage.getItem('token');
            await axios.post('/auth/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Vídeo enviado com sucesso!');
            navigate('/perfil');
        } catch (error) {
            console.error('Erro no upload:', error);
            alert(error.response?.data?.message || 'Erro ao enviar vídeo');
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
                    <div className={styles.formGroup}>
                        <label htmlFor="videoFile">Selecionar Arquivo:</label>
                        <input 
                            type="file" 
                            id="videoFile" 
                            accept="video/mp4, video/quicktime, audio/mpeg"
                            onChange={aoSelecionarArquivo}
                        />
                    </div>

                    {videoFile && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="titulo">Título:</label>
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
                                <label htmlFor="descricao">Descrição:</label>
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
                                <label htmlFor="palavrasChave">Palavras-chave (opcional):</label>
                                <input
                                    type="text"
                                    id="palavrasChave"
                                    value={palavrasChave}
                                    onChange={(e) => setPalavrasChave(e.target.value)}
                                    placeholder="Separadas por vírgula"
                                />
                            </div>

                            <button 
                                className={styles.enviarBotao} 
                                onClick={aoEnviarVideo}
                                disabled={isEnviando}
                            >
                                {isEnviando ? 'Enviando...' : 'Enviar Vídeo'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default UploadVideo;