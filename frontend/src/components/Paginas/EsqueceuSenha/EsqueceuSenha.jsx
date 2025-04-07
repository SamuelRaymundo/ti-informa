import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EsqueceuSenha.module.css';
import Menu from '../../Menu/Menu';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState('');
  const navegarPara = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Se um e-mail correspondente for encontrado, você receberá um link para redefinir sua senha.');
    navegarPara('/login');
  };

  return (
    <div>
      <Menu />
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Recuperar Senha</h2>
            <p className={styles.instructionText}>Digite seu e-mail para receber o código de recuperação.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
              <button type="submit" className={styles.button}>
                Enviar Link de Recuperação
              </button>
            </form>
          </div>
          <div className={styles.register}>
            <span className={styles.registerText}>
              Lembrou sua senha?{' '}
              <button onClick={() => navegarPara('/login')} className={styles.registerLink}>
                Fazer Login
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className={`${styles.bar} ${styles.bottom}`}></div>
    </div>
  );
};

export default EsqueceuSenha;
