import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EsqueceuSenha.module.css';
import Menu from '../../Menu/Menu';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [respostaSeguranca, setRespostaSeguranca] = useState('');
  const [perguntaSeguranca, setPerguntaSeguranca] = useState('');
  const [erroResposta, setErroResposta] = useState('');
  const navegarPara = useNavigate();

  const perguntasOpcoes = [
    'Qual foi a sua primeira viagem inesquecível?',
    'Qual foi o seu brinquedo preferido na infância?',
    'Qual foi o seu primeiro filme no cinema?',
    'Qual foi o nome do seu primeiro animal de estimação?',
  ];

  const buscarPerguntaSeguranca = async (emailInserido) => {
    console.log('Buscando pergunta de segurança para o e-mail:', emailInserido);
    if (emailInserido === 'teste@teste.com') {
      const randomIndex = Math.floor(Math.random() * perguntasOpcoes.length);
      setPerguntaSeguranca(perguntasOpcoes[randomIndex]);
      setEtapa(2);
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    buscarPerguntaSeguranca(email);
  };

  const verificarResposta = (e) => {
    e.preventDefault();
    const respostaCorretaSimulada = 'alguma resposta';
    if (respostaSeguranca.trim().toLowerCase() === respostaCorretaSimulada.toLowerCase()) {
      alert('Resposta correta! Você será redirecionado para a página inicial.');
      navegarPara('/'); // Redirecionamento para a home
    } else {
      setErroResposta('Resposta incorreta. Tente novamente.');
    }
  };

  return (
    <div>
      <Menu />
      <div className={styles.container} style={{ justifyContent: 'center' }}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Recuperar Senha</h2>

            {etapa === 1 && (
              <>
                <p className={styles.instructionText}>Digite seu e-mail para verificar sua conta.</p>
                <form onSubmit={handleSubmitEmail}>
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
              </>
            )}

            {etapa === 2 && (
              <>
                <p className={styles.instructionText}>Responda à pergunta de segurança:</p>
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
                  {erroResposta && <p className={styles.erroResposta}>{erroResposta}</p>}
                  <button type="submit" className={styles.button}>
                    Verificar Resposta
                  </button>
                </form>
              </>
            )}
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