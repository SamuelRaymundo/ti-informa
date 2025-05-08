import React, { useState } from 'react';
import styles from './Perfil.module.css';
import { HiChevronDown, HiCog } from 'react-icons/hi';
import Menu from '../../Menu/Menu';

const Perfil = () => {
  const [descricao, setDescricao] = useState('');

  const handleEditClick = () => {

  };

  const handleLogout = () => {};

  const sections = [
    {
      id: 'videos',
      title: 'Seus vídeos',
      subSections: ['Vídeo 1', 'Vídeo 2', 'Vídeo 3'],
    },
    {
      id: 'playlists',
      title: 'Suas playlists',
      subSections: ['Playlist 1', 'Playlist 2', 'Playlist 3'],
    },
    {
      id: 'interesses',
      title: 'Interesses',
      subSections: ['Interesse 1', 'Interesse 2', 'Interesse 3'],
    },
  ];

  const [activeSections, setActiveSections] = useState([]);

  const toggleSection = (sectionId) => {
    setActiveSections((prevActiveSections) =>
      prevActiveSections.includes(sectionId)
        ? prevActiveSections.filter((id) => id !== sectionId)
        : [...prevActiveSections, sectionId]
    );
  };

  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <img
            src="https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785374-stock-illustration-hand-drawn-modern-man-avatar.jpg"
            alt="Foto de Perfil"
            className={styles.profileImage}
          />
          <div className={styles.profileInfo}>
            <h2 className={styles.userName}>Nome de Usuário</h2>
            <p className={styles.userEmail}>email@usuario.com</p>
            <textarea
              className={styles.userDescription}
              placeholder="Descrição do usuário."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <p className={styles.creatorText}>Criador</p>
            <p className={styles.signature}>Assinatura</p>
          </div>
          <HiCog
            className={styles.settingsIcon}
            onClick={() => (window.location.href = '/config')}
          />
          <button className={styles.editButton} onClick={handleEditClick}>
            Editar
          </button>
        </div>

        <div className={styles.navigationLinks}>
          {sections.map((section) => (
            <div
              key={section.id}
              className={`${styles.section} ${
                activeSections.includes(section.id) ? styles.open : ''
              }`}
            >
              <p onClick={() => toggleSection(section.id)}>
                {section.title} <HiChevronDown />
              </p>
              <div
                className={`${styles.subSectionContainer} ${
                  activeSections.includes(section.id) ? styles.open : ''
                }`}
              >
                {section.subSections.map((subSection, index) => (
                  <p key={index}>{subSection}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Sair da conta
        </button>
      </div>
    </div>
  );
};

export default Perfil;
