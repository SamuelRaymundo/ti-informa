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
    confirmarSenha: '',
    formacao: '',
  });

  const [validNome, setValidNome] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validSenha, setValidSenha] = useState(false);
  const [validCpf, setValidCpf] = useState(false);
  const [validFormacao, setValidFormacao] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navegarPara = useNavigate();

  useEffect(() => {
    const nomeValido = /^[a-zA-Z\s]+$/.test(formData.nome); // Nome com apenas letras e espaços
    setValidNome(nomeValido);
  }, [formData.nome]);

  useEffect(() => {
    const emailValido = /^[^@]*@[^@]*$/.test(formData.email); // Verifica se o e-mail contém exatamente um "@" e o domínio é válido
    setValidEmail(emailValido);
  }, [formData.email]);
  

  useEffect(() => {
    const senhaValida = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(formData.senha); // Regex para senha forte
    setValidSenha(senhaValida);
  }, [formData.senha]);


  useEffect(() => {
    const cpfValido = /^\d{11}$/.test(formData.cpf); // Regex para CPF
    setValidCpf(cpfValido);
  }, [formData.cpf]);

  useEffect(() => {
    const formacaoValida = formData.formacao.trim().length > 0; // Verifica se a formação não está vazia
    setValidFormacao(formacaoValida);
  }, [formData.formacao]);

  const Mudanca = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Envio = (e) => {
    e.preventDefault();

    if (
      validNome &&
      validEmail &&
      validSenha &&
      validConfirmarSenha &&
      validCpf &&
      validFormacao
    ) {
      alert('Pedido de registro como criador enviado com sucesso!');
      navegarPara('/perfil');
    } else {
      setError('Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <div>
      <Layout />
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Registro de Criador</h2>
            {error && <p className={styles.error}>{error}</p>}
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
              {!validNome && formData.nome && (
                <p className={styles.error}>Digite um nome válido (apenas letras).</p>
              )}

              <input
                type="text"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={Mudanca}
                className={styles.input}
                required
              />
              {!validEmail && formData.email && (
                <p className={styles.error}>Digite um e-mail válido.</p>
              )}

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
              {!validSenha && formData.senha && (
                <p className={styles.error}>A senha deve ter: 8+ caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.</p>
              )}

              
              <input
                type="text"
                name="cpf"
                placeholder="Digite seu CPF"
                value={formData.cpf}
                onChange={Mudanca}
                className={styles.input}
                required
              />
              {!validCpf && formData.cpf && (
                <p className={styles.error}>O CPF deve conter 11 dígitos numéricos.</p>
              )}

              <input
                type="text"
                name="formacao"
                placeholder="Formação acadêmica"
                value={formData.formacao}
                onChange={Mudanca}
                className={styles.input}
                required
              />
              {!validFormacao && formData.formacao && (
                <p className={styles.error}>Preencha a formação acadêmica.</p>
              )}

              <button type="submit" className={styles.button}>
                Enviar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCriador;
