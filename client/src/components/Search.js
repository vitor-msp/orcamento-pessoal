import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {changeCurrentText} from '../store/actions/currentText.actions'
import css from './search.module.css';

export default function Search({ transactions, newTransactions }) {
  // const [currentText, setCurrentText] = useState('');
  const currentText = useSelector(state => state.currentText)
  const dispatch = useDispatch();

  useEffect(() => {
    searchText(currentText);
    return () => {};
  }, [transactions]);

  const handleSearchChange = (event) => {
    // setCurrentText(event.target.value);
    dispatch(changeCurrentText(event.target.value));
    searchText(event.target.value);
  };

  const searchText = (text) => {
    const filteredTransactions = transactions.filter(
      ({ descriptionLowerCase }) => {
        return descriptionLowerCase.includes(text.toLowerCase());
      }
    );
    newTransactions(filteredTransactions);
  };

  return (
    <div className={css.div}>
      <input
        placeholder={`Pesquisa...`}
        className={css.input}
        type="text"
        value={currentText}
        onChange={handleSearchChange}
      />
    </div>
  );
}
