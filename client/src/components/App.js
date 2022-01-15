import React, { useState, useEffect } from "react";
import { getByPeriod } from "../api/api.js";
import { changeCurrentPeriod } from "../store/actions/currentPeriod.actions";
import { updateAllTransactions } from "../store/actions/allTransactions.actions";
import { changeSelectedTransaction } from "../store/actions/selectedTransaction.actions";
import {toggleModal} from '../store/actions/isModalOpen.actions';

import Nav from "./Nav.js";
import Stat from "./Stat.js";
import Search from "./Search.js";
import List from "./List.js";
import ModalTransaction from "./Modal.js";
import css from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchTransactions } from "../store/selectors/allTransactions.selectors.js";

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
  // const [allTransactions, setAllTransactions] = useState([]);
  const searchedTransactions = useSelector(searchTransactions);
  // const [searchedTransactions, setSearchedTransactions] = useState([]);
  const [distinctYears, setDistinctYears] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  const currentPeriod = useSelector((state) => state.currentPeriod);
  const selectedTransaction = useSelector((state) => state.selectedTransaction);
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const dispatch = useDispatch();
  // let isPost = false;

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
    // setAllTransactions(data.transactions);
    dispatch(updateAllTransactions(data.transactions));
    // setSearchedTransactions(data.transactions);
  }

  useEffect(() => {
    getTransactions();
    return () => {};
  }, [currentPeriod]);

  useEffect(() => {
    console.log(selectedTransaction);
    dispatch(toggleModal(selectedTransaction === null ? false : true));
    return () => {};
  }, [selectedTransaction]);

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
            // setModalContent("Post");
            // isPost = true;
            const newEmptyTransaction = Object.assign({},emptyTransaction)
            dispatch(changeSelectedTransaction(newEmptyTransaction));
            // dispatch(toggleModal(true));
          }}
        >
          + NOVO LANÇAMENTO
        </button>

        <Search
          // transactions={allTransactions}
          // newTransactions={(newTransactions) => {
          //   setSearchedTransactions(newTransactions);
          // }}
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
            transactions={searchedTransactions}
            // allTransactions={allTransactions}
            // newTransactions={(transactions) => {
            //   setAllTransactions(transactions);
            // }}
            // modalContent={(transaction) => {
            //   setModalContent(transaction);
            // }}
          />
        )}
      </div>

      <div className={css.flex}>
        {isModalOpen && (
          <ModalTransaction
            selectedTransaction={selectedTransaction}
            // modalContent={modalContent}
            // onEsc={() => {
            //   setModalContent(null);
            // }}
            // transactions={allTransactions}
            // updatedTransactions={(transactions) => {
            //   setAllTransactions(transactions);
            // }}
            currentPeriod={currentPeriod}
            isPost={selectedTransaction._id === "" ? true : false}
            // isOpen={modalOpen}
          />
        )}
      </div>
    </div>
  );
}
