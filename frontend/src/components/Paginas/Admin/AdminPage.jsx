import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import axios from '../../../api/axios-config';
import styles from './AdminPage.module.css'; // você pode criar um css module separado para o admin

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const carregarAdmin = async () => {
      try {
        const response = await axios.get('/auth/me', { headers });

        if (response.data.funcao !== 'ADMINISTRADOR') {
          alert('Você não tem permissão para acessar esta página.');
          navigate('/login');
          return;
        }

        // pode setar estados com dados do admin aqui se precisar
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Erro ao carregar dados do administrador.');
        }
      } finally {
        setLoading(false);
      }
    };

    carregarAdmin();
  }, [navigate]);

  if (loading) return <p>Carregando dados do administrador...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <>
      <Layout />
      <div className={styles.container}>
        <h1>Página do Administrador</h1>
        Pagina Adm
      </div>
      
    </>
  );
};

export default AdminPage;
