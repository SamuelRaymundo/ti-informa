import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import Menu from '../../Menu/Menu';

const Register = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [mostrarSenhas, setMostrarSenhas] = useState(false);
  const navegarPara = useNavigate();

  const Mudanca = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Envio = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Conta criada com sucesso!');
    navegarPara('/interesses');
  };

  const menu = () => {
    alert('Menu clicado!');
  };

  const VisibilidadePassword = () => {
    setMostrarSenhas((prev) => !prev);
  };

  return (
    <div>
     <Menu />
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Criar Conta</h2>
            <form onSubmit={Envio}>
              <input
                type="text"
                name="nomeCompleto"
                placeholder="Nome Completo"
                value={formData.nomeCompleto}
                onChange={Mudanca}
                className={styles.input}
                required
              />
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
                  type={mostrarSenhas ? 'text' : 'password'}
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={Mudanca}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={VisibilidadePassword}
                >
                  {mostrarSenhas ? 'Esconder' : 'Mostrar'}
                </button>
              </div>

              <div className={styles.passwordContainer}>
                <input
                  type={mostrarSenhas ? 'text' : 'password'}
                  name="confirmarSenha"
                  placeholder="Confirmar Senha"
                  value={formData.confirmarSenha}
                  onChange={Mudanca}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={VisibilidadePassword}
                >
                  {mostrarSenhas ? 'Esconder' : 'Mostrar'}
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
              <button onClick={() => navegarPara('/login')} className={ styles.registerLink}>
                Conecte-se
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className={`${styles.bar} ${styles.bottom}`}></div>
    </div>
  );
};

export default Register;