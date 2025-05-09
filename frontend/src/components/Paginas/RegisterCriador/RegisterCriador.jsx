import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterCriador.module.css';
import Layout from '../../Layout/Layout';

const RegisterCriador = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    formacao: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navegarPara = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navegarPara('/login');
    }
  }, [navegarPara]);

  const Mudanca = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const Envio = (e) => {
    e.preventDefault();
    alert('Pedido de registro como criador enviado com sucesso!');
    navegarPara('/perfil');
  };

  return (
    <div>
      <Layout />
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Registro de Criador</h2>
            <form onSubmit={Envio}>
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                value={formData.nome}
                onChange={Mudanca}
                className={styles.input}
                required
              />

              <input
                type="text"
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
                  name="senha"
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={Mudanca}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.togglePassword}
                >
                  {showPassword ? 'Esconder' : 'Mostrar'}
                </button>
              </div>

              <input
                type="text"
                name="cpf"
                placeholder="Digite seu CPF"
                value={formData.cpf}
                onChange={Mudanca}
                className={styles.input}
                required
              />

              <input
                type="text"
                name="formacao"
                placeholder="Formação acadêmica"
                value={formData.formacao}
                onChange={Mudanca}
                className={styles.input}
                required
              />

              <button type="submit" className={styles.button}>
                Enviar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={`${styles.bar} ${styles.bottom}`}></div>
    </div>
  );
};

export default RegisterCriador;