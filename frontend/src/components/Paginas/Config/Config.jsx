import React, { useState } from 'react';
import styles from './Config.module.css';
import Menu from '../../Menu/Menu';
import { HiChevronDown, HiCog } from 'react-icons/hi';

const Config = () => {
  const [activeSections, setActiveSections] = useState([]);

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
      <Menu />
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
