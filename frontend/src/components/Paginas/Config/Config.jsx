import React, { useState, useEffect } from 'react';
import styles from './Config.module.css';
import Layout from '../../Layout/Layout';
import { HiChevronDown, HiCog } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Config = () => {
  const [activeSections, setActiveSections] = useState([]);
  const navegarPara = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navegarPara('/login');
    }
  }, [navegarPara]);

  const toggleSection = (section) => {
    setActiveSections((prevActiveSections) =>
      prevActiveSections.includes(section)
        ? prevActiveSections.filter((s) => s !== section)
        : [...prevActiveSections, section]
    );
  };

  const handleSubSectionClick = (subSection) => {
    alert(`Você clicou em: ${subSection}`);
  };

  const sections = [
    {
      id: 'conta',
      title: 'Configurações da Conta',
      subSections: ['Alterar nome e e-mail', 'Mudar senha', 'Configuração de foto de perfil'],
    },
    {
      id: 'tema',
      title: 'Tema e Acessibilidade',
      subSections: ['Escolher tema', 'Configurações de acessibilidade'],
    },
    {
      id: 'cursos',
      title: 'Preferências de Cursos',
      subSections: ['Gerenciar categorias de interesse', 'Configurações de recomendações'],
    },
  ];

  return (
    <div>
      <Layout />
      <div className={styles.container}>
        <h1 className={styles.title}>Configurações</h1>
        {sections.map((section) => (
          <div key={section.id} className={styles.section}>
            <h2 onClick={() => toggleSection(section.id)}>{section.title}<HiChevronDown /></h2>
            {activeSections.includes(section.id) && (
              <div className={styles.subSection}>
                {section.subSections.map((subSection, index) => (
                  <p key={index} onClick={() => handleSubSectionClick(subSection)}>
                    {subSection}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Config;