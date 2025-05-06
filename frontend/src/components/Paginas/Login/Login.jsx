import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import Menu from '../../Menu/Menu';
import axios from '../../../api/axios-config';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const navegarPara = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUsuarioLogado(true);
    if (location.state?.registrationSuccess) {
      setRegistrationSuccess(true);
      const timer = setTimeout(() => setRegistrationSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/auth/login', {
        email: formData.email,
        senha: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      setUsuarioLogado(true);
      navegarPara('/home');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('E-mail ou senha incorretos');
        } else {
          setError('Erro ao fazer login');
        }
      } else {
        setError('Não foi possível conectar ao servidor');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsuarioLogado(false);
    navegarPara('/login');
  };

  if (usuarioLogado) {
    return (
      <div>
        <Menu />
        <div className={styles.container}>
          <div className={styles.formSection}>
            <div className={styles.card}>
              <div className={styles.logadoMessage}>
                Você já está logado em uma conta.
              </div>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Sair da conta
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.bar} ${styles.bottom}`}></div>
      </div>
    );
  }

  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>T.I Informa</h2>
            <button className={styles.googleButton}>Login com Google</button>
            <div className={styles.separator}>
              <div className={styles.line}></div>
              <span className={styles.orText}>OU</span>
              <div className={styles.line}></div>
            </div>
            {registrationSuccess && (
              <div className={styles.successMessage}>
                Cadastro realizado com sucesso! Faça login para continuar.
              </div>
            )}
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Esconder' : 'Mostrar'}
                </button>
              </div>
              <button type="submit" className={styles.button}>
                Entrar
              </button>
            </form>
            <button
              type="button"
              onClick={() => navegarPara('/EsqueceuSenha')}
              className={styles.forgotPassword}
            >
              Esqueceu a senha?
            </button>
          </div>
          <div className={styles.register}>
            <span className={styles.registerText}>
              Não tem uma conta?{' '}
              <button
                onClick={() => navegarPara('/register')}
                className={styles.registerLink}
              >
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