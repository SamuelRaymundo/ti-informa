import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import Menu from '../../Menu/Menu';
import axios from '../../../api/axios-config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
    try {
      const response = await axios.post('/auth/login', {
        email: formData.email,
        senha: formData.password 
      });

      localStorage.setItem('token', response.data.token);
      navigate('/home');
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

  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Entrar</h2>

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
          </div>

          <div className={styles.register}>
            <span className={styles.registerText}>
              Não tem uma conta?{' '}
              <button
                onClick={() => navigate('/register')}
                className={styles.registerLink}
              >
                Cadastre-se
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;