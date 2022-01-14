import React, { useState, useEffect } from "react";
import { getByPeriod } from "../api/api.js";
import { changeCurrentPeriod } from "../store/actions/currentPeriod.actions";

import Nav from "./Nav.js";
import Stat from "./Statistics.js";
import Search from "./Search.js";
import List from "./List.js";
import ModalTransaction from "./Modal.js";
import css from "./app.module.css";
import { useSelector } from "react-redux";

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  // const allTransactions = useSelector(state => state.allTransactions)
  const [searchedTransactions, setSearchedTransactions] = useState([]);
  const [distinctYears, setDistinctYears] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const currentPeriod = useSelector((state) => state.currentPeriod);

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
        <Nav years={distinctYears} />
      </div>

      <div className={css.flex} style={{ justifyContent: `left` }}>
        <button
          className={css.button}
          onClick={() => {
            setModalContent("Post");
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
