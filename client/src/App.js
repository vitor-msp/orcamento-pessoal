import React, { useState, useEffect } from 'react';
import { getByPeriod } from './api/api.js';

import Nav from './components/Nav.js';
import Stat from './components/Statistics.js';
import Search from './components/Search.js';
import List from './components/List.js';
import ModalTransaction from './components/Modal.js';
import css from './app.module.css';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchedTransactions, setSearchedTransactions] = useState([]);
  const [distinctYears, setDistinctYears] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState('2021-06');

  //effect inicial
  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    const data = await getByPeriod(currentPeriod);
    setDistinctYears(data.distinctYears);
    data.transactions = data.transactions.map(
      ({ _id, description, value, category, type, yearMonthDay }) => {
        return {
          _id,
          description,
          descriptionLowerCase: description.toLowerCase(),
          category,
          type,
          value,
          yearMonthDay,
        };
      }
    );
    setAllTransactions(data.transactions);
    setSearchedTransactions(data.transactions);
  }

  useEffect(() => {
    getTransactions();
    return () => {};
  }, [currentPeriod]);

  return (
    <div className={css.container}>
      <div className={css.flex}>
        <h2>Controle Financeiro Pessoal</h2>
      </div>

      <div className={css.flex}>
        <Nav
          years={distinctYears}
          periodToSearch={(period) => {
            setCurrentPeriod(period);
          }}
        />
      </div>

      <div className={css.flex} style={{ justifyContent: `left` }}>
        <button
          className={css.button}
          onClick={() => {
            setModalContent('Post');
          }}
        >
          + NOVO LANÇAMENTO
        </button>

        <Search
          transactions={allTransactions}
          newTransactions={(newTransactions) => {
            setSearchedTransactions(newTransactions);
          }}
        />
      </div>

      <div className={css.flex}>
        <Stat transactions={searchedTransactions} />
      </div>

      <div className={css.flex}>
        {searchedTransactions.length === 0 ? (
          <p>Nenhum resultado encontrado.</p>
        ) : (
          <List
            currentTransactions={searchedTransactions}
            allTransactions={allTransactions}
            newTransactions={(transactions) => {
              setAllTransactions(transactions);
            }}
            modalContent={(transaction) => {
              setModalContent(transaction);
            }}
          />
        )}
      </div>

      <div className={css.flex}>
        {modalContent !== null && (
          <ModalTransaction
            modalContent={modalContent}
            onEsc={() => {
              setModalContent(null);
            }}
            transactions={allTransactions}
            updatedTransactions={(transactions) => {
              setAllTransactions(transactions);
            }}
            currentPeriod={currentPeriod}
          />
        )}
      </div>
    </div>
  );
}
