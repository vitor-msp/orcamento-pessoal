import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {changeCurrentText} from '../store/actions/currentText.actions'
import css from './search.module.css';

export default function Search() {
  const currentText = useSelector(state => state.currentText)
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(changeCurrentText(event.target.value));
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
