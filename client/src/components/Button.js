import React from "react";
import css from "./button.module.css";
import { useDispatch } from "react-redux";
import { remove } from "../api/api.js";
import {changeSelectedTransaction} from '../store/actions/selectedTransaction.actions'
import { removeTransaction } from "../store/actions/allTransactions.actions";
// import { toggleModal } from "../store/actions/isModalOpen.actions";


export default function Button({ type, transaction }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    type === "delete" ? handleDelete(transaction._id) : handleEdit(transaction);
  };

  const handleDelete = async (id) => {
    try {
      const res = await remove(id);
      if (res) {
        dispatch(removeTransaction(id));
      } else {
        throw new Error(`Erro ao deletar item!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (transaction) => {
    dispatch(changeSelectedTransaction(transaction));
    // dispatch(toggleModal(true));
    // modalContent(transaction);
  };

  return (
    <div>
      <button onClick={handleClick} className={`material-icons ${css.button}`}>
        {type}
      </button>
    </div>
  );
}
