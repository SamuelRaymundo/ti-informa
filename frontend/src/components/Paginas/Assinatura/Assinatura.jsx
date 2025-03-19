import React from 'react';
import styles from './Assinatura.module.css';
import Menu from '../../Menu/Menu';

const Assinatura = () => {
  const planos = [
    {
      titulo: 'Inscrição',
      vantagens: ['Vantagem 1', 'Vantagem 2', 'Vantagem 3'],
      tipo: 'Mensal',
      preco: 'R$ 4,00',
    },
    {
      titulo: 'Inscrição Plus',
      vantagens: ['Vantagem 1', 'Vantagem 2', 'Vantagem 3'],
      tipo: 'Mensal',
      preco: 'R$ 10,00',
    },
    {
      titulo: 'Doação',
      vantagens: ['Pode pagar qualquer valor que desejar acima de R$ 5,00'],
      tipo: 'Mínimo',
      preco: 'R$ 5,00',
    },
  ];

  const handleCardClick = (titulo) => {
    alert(`Você selecionou: ${titulo}`);
  };

  return (
    <div>
      <Menu />
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          {planos.map((plano, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleCardClick(plano.titulo)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCardClick(plano.titulo);
              }}
            >
              <h2 className={styles.titulo}>{plano.titulo}</h2>
              <div className={styles.listaVantagens}>
                <h3>Vantagens</h3>
                <ul>
                  {plano.vantagens.map((vantagem, idx) => (
                    <li key={idx}>{vantagem}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.tipoPrecoContainer}>
                <span className={styles.preco}>
                  {plano.tipo} {plano.preco}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assinatura;
