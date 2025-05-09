import React, { useEffect } from 'react';
import styles from './Home.module.css';
import Layout from '../../Layout/Layout';
import { FaStar, FaComment } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const renderizarEstrelas = () => {
    return (
      <div className={styles.estrelas}>
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} color="#FFD700" />
        ))}
      </div>
    );
  };

  const renderizarCards = () => {
    return (
      <div className={styles.containerCards}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.conteudoCard}></div>
            <div className={styles.rodapeCard}>
              {renderizarEstrelas()}
              <FaComment className={styles.iconeComentario} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.paginaHome}>
      <Layout />
      <div className={styles.barraPesquisaFiltros}>
        <div className={styles.barraPesquisaContainer}>
          <input
            type="text"
            placeholder="Pesquisar..."
            className={styles.barraPesquisa}
          />
          <HiOutlineSearch className={styles.iconePesquisa} />
        </div>
        <div className={styles.filtros}>
          <span className={styles.tituloFiltros}>Filtros</span>
          <select className={styles.selectCategorias}>
            <option>Todas as categorias</option>
          </select>
        </div>
      </div>

      <div className={styles.secao}>
        <h2 className={styles.tituloSecao}>
          Recomendados de acordo com seus interesses.
        </h2>
        {renderizarCards()}
      </div>

      <div className={styles.secao}>
        <h2 className={styles.tituloSecao}>Populares</h2>
        {renderizarCards()}
      </div>
    </div>
  );
};

export default Home;