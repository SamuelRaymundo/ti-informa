// UploadVideo.jsx
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
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const aoSelecionarArquivo = (event) => {
        setVideoFile(event.target.files[0]);
    };

    const aoEnviarVideo = async () => {
        if (!videoFile) {
            alert('Por favor, selecione um arquivo de vídeo.');
            return;
        }
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('titulo', titulo);
        formData.append('descricao', descricao);
        formData.append('categoria', categoria || '');
        if (palavrasChave) {
            palavrasChave.split(',').map(s => s.trim()).forEach((palavra) => {
                formData.append('palavraChave', palavra);
            });
        } else {
            formData.append('palavraChave', '');
        }
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/auth/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Resposta do upload:', response.data);
            alert('Vídeo enviado com sucesso!');
            navigate('/perfil');
        } catch (error) {
            console.error('Erro ao enviar o vídeo:', error);
            alert('Erro ao enviar o vídeo.');
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
                        <input type="file" id="videoFile" accept="video/mp4, audio/mpeg" onChange={aoSelecionarArquivo} />
                    </div>
                    {videoFile && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="titulo">Título:</label>
                                <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Digite o título do vídeo" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="descricao">Descrição:</label>
                                <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Digite a descrição do vídeo" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="categoria">Categoria (opcional):</label>
                                <input type="text" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Digite a categoria do vídeo" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="palavrasChave">Palavras-chave (opcional, separadas por vírgula):</label>
                                <input type="text" id="palavrasChave" value={palavrasChave} onChange={(e) => setPalavrasChave(e.target.value)} placeholder="Ex: educação, tutorial, tecnologia" />
                            </div>
                            <button className={styles.enviarBotao} onClick={aoEnviarVideo}>
                                Enviar Vídeo
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default UploadVideo;