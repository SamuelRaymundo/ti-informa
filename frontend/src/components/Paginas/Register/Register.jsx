import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import Menu from '../../Menu/Menu';
import axios from '../../../api/axios-config';

const Perguntas = [
  "Qual foi a sua primeira viagem inesquecível?",
  "Qual foi o seu brinquedo preferido na infância?",
  "Qual foi o seu primeiro filme no cinema?",
  "Qual foi o nome do seu primeiro animal de estimação?"
];

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (question) => {
    setSelectedQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return regex.test(password);
  };

  const handleFirstSubmit = (e) => {
    e.preventDefault();
    setError('');
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
    setShowQuestions(true);
  };

  const handleQuestionsSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (selectedQuestions.length === 0) {
      setError('Selecione pelo menos uma pergunta de segurança.');
      return;
    }
    for (let q of selectedQuestions) {
      if (!answers[q] || answers[q].trim() === '') {
        setError('Responda todas as perguntas selecionadas.');
        return;
      }
    }
    const pergunta_resposta = selectedQuestions.map((q) => ({
      pergunta: q,
      resposta: answers[q]
    }));
    try {
      const response = await axios.post('/auth/register/usuario', {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        pergunta_resposta
      });
      if (response.status === 200) {
        navigate('/login', { state: { registrationSuccess: true } });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(typeof err.response.data === 'object' ? err.response.data.message || 'Erro ao cadastrar usuário' : err.response.data);
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
            {error && (
              <p className={styles.errorMessage}>
                {typeof error === 'object' ? error.message : error}
              </p>
            )}
            {!showQuestions ? (
              <form onSubmit={handleFirstSubmit}>
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
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
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
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? 'Esconder' : 'Mostrar'}
                  </button>
                </div>
                <button type="submit" className={styles.button}>
                  Cadastrar
                </button>
              </form>
            ) : (
              <form onSubmit={handleQuestionsSubmit}>
                <label className={styles.securityQuestionsLabel}>
                  Perguntas de Segurança:
                </label>
                <div className={styles.securityQuestionsList}>
                  {Perguntas.map((q) => (
                    <div key={q} className={styles.securityQuestionItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedQuestions.includes(q)}
                          onChange={() => handleQuestionChange(q)}
                        />{' '}
                        {q}
                      </label>
                      {selectedQuestions.includes(q) && (
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Sua resposta"
                          value={answers[q] || ''}
                          onChange={(e) => handleAnswerChange(q, e.target.value)}
                          style={{ marginTop: 8 }}
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button type="submit" className={styles.button}>
                  Salvar respostas
                </button>
              </form>
            )}
          </div>
          <div className={styles.register}>
            <span className={styles.registerText}>
              Já possui uma conta?{' '}
              <button
                onClick={() => navigate('/login')}
                className={styles.registerLink}
              >
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