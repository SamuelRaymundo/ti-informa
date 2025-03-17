import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import logo from './logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiAcademicCap } from "react-icons/hi";
import { HiLogin } from "react-icons/hi";
import { HiKey } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi";
import { HiAdjustments } from "react-icons/hi";
import { HiUser } from "react-icons/hi";

const Menu = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const navegarPara = (rota) => {
    navigate(rota);
    setMenuAberto(false);
  };

  return (
    <div>
      <div className={styles.cabecalho}>
        <button className={styles.botaoMenu} onClick={toggleMenu}>
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>
        <span className={styles.tituloCabecalho}>T.I Informa</span>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={`${styles.menuLateral} ${menuAberto ? styles.menuAberto : ''}`}>
        <ul>
          <li onClick={() => navegarPara('/home')}><HiAcademicCap /> Home</li>
          <li onClick={() => navegarPara('/login')}><HiLogin /> Login</li>
          <li onClick={() => navegarPara('/register')}><HiKey /> Registrar</li>
          <li onClick={() => navegarPara('/assinatura')}><HiCreditCard /> Assinaturas</li>
          <li onClick={() => navegarPara('/perfil')}><HiUser /> Perfil</li>
          <li onClick={() => navegarPara('/config')}><HiAdjustments /> Configuração</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
