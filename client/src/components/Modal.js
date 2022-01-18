import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { post, update } from "../api/api.js";
import {updateTransaction, createTransaction, removeTransaction} from '../store/actions/allTransactions.actions'
import {toggleModal} from '../store/actions/isModalOpen.actions';
import css from "./modal.module.css";
import { emptyTransaction } from "./App.js";

Modal.setAppElement("#root");

export default function ModalTransaction({
  selectedTransaction,
  currentPeriod,
  isPost
}) {
  const [message, setMessage] = useState("");
  const [colorMessage, setColorMessage] = useState({ color: "orange" });
  const [currentTransaction, setCurrentTransaction] = useState(selectedTransaction);
  const isModalOpen = useSelector(state => state.isModalOpen)
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  },[]);

  const handleKeyDown = (event) => {
    event.key === "Escape" && dispatch(toggleModal(false));
    event.key === "Enter" && handleSave();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "description") {
      setCurrentTransaction({
        ...currentTransaction,
        ["description"]: value,
        ["descriptionLowerCase"]: value.toLowerCase(),
      });
      return;
    }
    if (name === "value") {
      setCurrentTransaction({ ...currentTransaction, [name]: parseFloat(value) });
      return;
    }
    setCurrentTransaction({ ...currentTransaction, [name]: value });
  };

  const handleSave = () => {
    const {
      type,
      description,
      descriptionLowerCase,
      category,
      value,
      yearMonthDay,
    } = currentTransaction;
    if (
      (type === "") |
      (description === "") |
      (descriptionLowerCase === "") |
      (category === "") |
      (value === 0) |
      !yearMonthDay
    ) {
      setMessage("Favor preencher todos os campos!");
      setColorMessage({ color: "orange" });
      return;
    }
    setMessage("");
    isPost ? handlePost() : handleUpdate();
  };

  const handlePost = async () => {
    try {
      const data = await post(currentTransaction);
      setMessage(`Salvo com sucesso!`);
      setColorMessage({ color: "green" });
      setCurrentTransaction(emptyTransaction);
      if (data.yearMonth === currentPeriod) {
        const { _id, type, description, category, value, yearMonthDay } = data;
        const postedTransaction = {
          _id,
          type,
          description,
          descriptionLowerCase: description.toLowerCase(),
          category,
          value,
          yearMonthDay,
        };
        dispatch(createTransaction(postedTransaction));
      }
    } catch (error) {
      setMessage(`Erro ao salvar!`);
      setColorMessage({ color: "red" });
    }
  };

  const handleUpdate = async () => {
    try {
      await update(currentTransaction);
      setMessage(`Salvo com sucesso!`);
      setColorMessage({ color: "green" });
      const arrayDate = currentTransaction.yearMonthDay.split("-");
      const currentDate = `${arrayDate[0]}-${arrayDate[1]}`;
      if (currentDate === currentPeriod) {
        dispatch(updateTransaction(currentTransaction));
        return;
      }
      dispatch(removeTransaction(currentTransaction._id));
    } catch (error) {
      setMessage(`Erro ao salvar!`);
      setColorMessage({ color: "red" });
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} className={css.modal}>
        <div className={css.header}>
          <h3>Edição de Lançamento</h3>

          <button
            className={css.close}
            onClick={() => {
              dispatch(toggleModal(false))
            }}
          >
            X
          </button>
        </div>

        <form className={css.form}>
          <div className={css.radios}>
            <div>
              <label
                className={`${css.label} ${css.flex}`}
                style={currentTransaction.type === "-" ? { fontWeight: "bold" } : {}}
                style={isPost ? { cursor: "pointer" } : {}}
              >
                <input
                  className={
                    currentTransaction.type === "-"
                      ? `${css.radio} ${css.marked}`
                      : css.radio
                  }
                  style={isPost ? { cursor: "pointer" } : {}}
                  type="radio"
                  name="type"
                  disabled={isPost ? false : true}
                  onClick={() => {
                    setCurrentTransaction({
                      ...currentTransaction,
                      ["type"]: "-",
                    });
                  }}
                  required
                />
                <span>Despesa</span>
              </label>
            </div>

            <div>
              <label
                className={`${css.label} ${css.flex}`}
                style={currentTransaction.type === "+" ? { fontWeight: "bold" } : {}}
                style={isPost ? { cursor: "pointer" } : {}}
              >
                <input
                  className={
                    currentTransaction.type === "+"
                      ? `${css.radio} ${css.marked}`
                      : css.radio
                  }
                  style={isPost ? { cursor: "pointer" } : {}}
                  type="radio"
                  name="type"
                  disabled={isPost ? false : true}
                  onClick={() => {
                    setCurrentTransaction({
                      ...currentTransaction,
                      ["type"]: "+",
                    });
                  }}
                  required
                />
                <span>Receita</span>
              </label>
            </div>
          </div>

          <label className={css.label}>
            Descrição: <br />
            <input
              className={css.text}
              type="text"
              name="description"
              value={currentTransaction.description}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className={css.label}>
            Categoria: <br />
            <input
              className={css.text}
              type="text"
              name="category"
              value={currentTransaction.category}
              onChange={handleInputChange}
              required
            />
          </label>

          <div className={css.valueDate}>
            <label className={css.label} style={{ width: `38%` }}>
              Valor: <br />
              <input
                className={css.number}
                type="number"
                name="value"
                value={currentTransaction.value}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className={css.label} style={{ width: `58%` }}>
              Data:
              <input
                className={css.date}
                type="date"
                name="yearMonthDay"
                value={currentTransaction.yearMonthDay}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
        </form>

        <div className={css.footer}>
          <button className={css.save} type="submit" onClick={handleSave}>
            Salvar
          </button>

          <span className={css.message} style={colorMessage}>
            {message}
          </span>
        </div>
      </Modal>
    </div>
  );
}
