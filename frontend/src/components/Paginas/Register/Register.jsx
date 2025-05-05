import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import Menu from '../../Menu/Menu';
import axios from '../../../api/axios-config';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem!');
      return;
    }

    if (!validatePassword(formData.senha)) {
      setError('A senha deve conter: 8+ caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial');
      return;
    }

    try {
      const response = await axios.post('/auth/register/usuario', {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha
      });

      if (response.status === 200) {
        navigate('/login', { state: { registrationSuccess: true } });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data || 'Erro ao cadastrar usuário');
      } else if (err.request) {
        setError('Sem resposta do servidor');
      } else {
        setError('Erro ao configurar requisição');
      }
    }
  };

  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Criar Conta</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nome"
                placeholder="Nome Completo"
                value={formData.nome}
                onChange={handleChange}
                className={styles.input}
                required
              />
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
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)} // Atualiza o estado global de visibilidade
                >
                  {showPassword ? 'Esconder' : 'Mostrar'}
                </button>
              </div>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmarSenha"
                  placeholder="Confirmar Senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)} // Atualiza o mesmo estado global
                >
                  {showPassword ? 'Esconder' : 'Mostrar'}
                </button>
              </div>
              <button type="submit" className={styles.button}>
                Cadastrar
              </button>
            </form>
          </div>

          <div className={styles.register}>
            <span className={styles.registerText}>
              Já possui uma conta?{' '}
              <button onClick={() => navigate('/login')} className={styles.registerLink}>
                Conecte-se
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;