import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Menu from '../../Menu/Menu';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navegarPara = useNavigate();

  const Mudanca = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const VisibilidadePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const Envio = (e) => {
    e.preventDefault();
    alert('Login realizado com sucesso!');
    navegarPara('/home');
  };

  const menu = () => {
    alert('Menu clicado!');
  };

  return (
    <div>
     <Menu />
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Entrar</h2>
            <form onSubmit={Envio}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={Mudanca}
                className={styles.input}
                required
              />
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={Mudanca}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={VisibilidadePassword}
                >
                  {showPassword ? 'Esconder' : 'Mostrar'}
                </button>
              </div>
              <button type="submit" className={styles.button}>
                Entrar
              </button>
            </form>
          </div>

          <div className={styles.register}>
            <span className={styles.registerText}>
              Não tem uma conta?{' '}
              <button onClick={() => navegarPara('/register')} className={styles.registerLink}>
                Cadastre-se
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className={`${styles.bar} ${styles.bottom}`}></div>
    </div>
  );
};

export default Login;
