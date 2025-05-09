import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EsqueceuSenha.module.css';
import Layout from '../../Layout/Layout';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [perguntaSeguranca, setPerguntaSeguranca] = useState('');
  const [respostaSeguranca, setRespostaSeguranca] = useState('');
  const [erro, setErro] = useState('');
  const navegarPara = useNavigate();

  const buscarPerguntaSeguranca = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resp = await fetch(
        `http://localhost:8080/auth/recuperar-senha/pergunta?email=${encodeURIComponent(email)}`
      );
      if (resp.ok) {
        const pergunta = await resp.text();
        setPerguntaSeguranca(pergunta);
        setEtapa(2);
      } else {
        setErro('E-mail não encontrado.');
      }
    } catch {
      setErro('Erro ao buscar pergunta de segurança.');
    }
  };

  const verificarResposta = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resp = await fetch(
        'http://localhost:8080/auth/recuperar-senha/verificar-resposta',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, resposta: respostaSeguranca }),
        }
      );
      if (resp.ok) {
        alert('Resposta correta! Redirecionando para redefinir senha.');
        navegarPara('/redefinir-senha', { state: { email } });
      } else {
        setErro('Resposta incorreta. Tente novamente.');
      }
    } catch {
      setErro('Erro ao verificar resposta.');
    }
  };

  return (
    <div>
      <Layout />
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Recuperar Senha</h2>
            {etapa === 1 && (
              <>
                <p className={styles.instructionText}>
                  Digite seu e-mail ver se existe.
                </p>
                <form onSubmit={buscarPerguntaSeguranca}>
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
                    Verificar E-mail
                  </button>
                </form>
                {erro && <p className={styles.erroResposta}>{erro}</p>}
              </>
            )}
            {etapa === 2 && (
              <>
                <p className={styles.instructionText}>
                  Responda à pergunta de segurança:
                </p>
                <p className={styles.perguntaSeguranca}>{perguntaSeguranca}</p>
                <form onSubmit={verificarResposta}>
                  <input
                    type="text"
                    name="respostaSeguranca"
                    placeholder="Sua resposta"
                    value={respostaSeguranca}
                    onChange={(e) => setRespostaSeguranca(e.target.value)}
                    className={styles.input}
                    required
                  />
                  <button type="submit" className={styles.button}>
                    Verificar Resposta
                  </button>
                </form>
                {erro && <p className={styles.erroResposta}>{erro}</p>}
              </>
            )}
          </div>
          <div className={styles.register}>
            <span className={styles.registerText}>
              Lembrou sua senha?{' '}
              <button
                onClick={() => navegarPara('/login')}
                className={styles.registerLink}
              >
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