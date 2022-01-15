import React, { useState, useEffect } from "react";
import { getByPeriod } from "../api/api.js";
import { updateAllTransactions } from "../store/actions/allTransactions.actions";
import { changeSelectedTransaction } from "../store/actions/selectedTransaction.actions";
import { toggleModal } from "../store/actions/isModalOpen.actions";

import Nav from "./Nav.js";
import Stat from "./Stat.js";
import Search from "./Search.js";
import List from "./List.js";
import ModalTransaction from "./Modal.js";
import css from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchTransactions } from "../store/selectors/allTransactions.selectors.js";
import { updateDistinctYears } from "../store/actions/distinctYears.actions.js";

const emptyTransaction = {
  _id: "",
  type: "",
  description: "",
  descriptionLowerCase: "",
  category: "",
  value: 0,
  yearMonthDay: "",
};

export default function App() {
  const searchedTransactions = useSelector(searchTransactions);
  const currentPeriod = useSelector((state) => state.currentPeriod);
  const selectedTransaction = useSelector((state) => state.selectedTransaction);
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const dispatch = useDispatch();

  async function getTransactions() {
    const data = await getByPeriod(currentPeriod);
    dispatch(updateDistinctYears(data.distinctYears));
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
    dispatch(updateAllTransactions(data.transactions));
  }

  useEffect(() => {
    getTransactions();
    return () => {};
  }, [currentPeriod]);

  useEffect(() => {
    dispatch(toggleModal(selectedTransaction === null ? false : true));
    return () => {};
  }, [selectedTransaction]);

  return (
    <div className={css.container}>
      <div className={css.flex}>
        <h2>Controle Financeiro Pessoal</h2>
      </div>

      <div className={css.flex}>
        <Nav />
      </div>

      <div className={css.flex} style={{ justifyContent: `left` }}>
        <button
          className={css.button}
          onClick={() => {
            const newEmptyTransaction = Object.assign({}, emptyTransaction);
            dispatch(changeSelectedTransaction(newEmptyTransaction));
          }}
        >
          + NOVO LANÇAMENTO
        </button>

        <Search />
      </div>

      <div className={css.flex}>
        <Stat transactions={searchedTransactions} />
      </div>

      <div className={css.flex}>
        {searchedTransactions.length === 0 ? (
          <p>Nenhum resultado encontrado.</p>
        ) : (
          <List transactions={searchedTransactions} />
        )}
      </div>

      <div className={css.flex}>
        {isModalOpen && (
          <ModalTransaction
            selectedTransaction={selectedTransaction}
            currentPeriod={currentPeriod}
            isPost={selectedTransaction._id === "" ? true : false}
          />
        )}
      </div>
    </div>
  );
}
