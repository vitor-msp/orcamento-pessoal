import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { post, update } from "../api/api.js";
import css from "./modal.module.css";

Modal.setAppElement("#root");

export default function ModalTransaction({
  modalContent,
  onEsc,
  transactions,
  updatedTransactions,
  currentPeriod,
}) {
  const [modalOpen, setModalOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [colorMessage, setColorMessage] = useState({ color: "orange" });
  // const [expenseChecked, setExpenseChecked] = useState();
  const [content, setContent] = useState({
    _id: "",
    type: "",
    description: "",
    descriptionLowerCase: "",
    category: "",
    value: 0,
    yearMonthDay: "",
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    event.key === "Escape" && onEsc(null);
    event.key === "Enter" && handleSave();
  };

  useEffect(() => {
    testTransaction();

    return () => {};
  }, [modalContent]);

  const testTransaction = () => {
    if (modalContent === "Post") {
      return;
    }
    setContent({
      _id: modalContent._id,
      type: modalContent.type,
      description: modalContent.description,
      descriptionLowerCase: modalContent.description.toLowerCase(),
      category: modalContent.category,
      value: modalContent.value,
      yearMonthDay: modalContent.yearMonthDay,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "description") {
      setContent({
        ...content,
        ["description"]: value,
        ["descriptionLowerCase"]: value.toLowerCase(),
      });
      return;
    }
    if (name === "value") {
      setContent({ ...content, [name]: parseFloat(value) });
      return;
    }
    setContent({ ...content, [name]: value });
  };

  const handleSave = () => {
    const {
      type,
      description,
      descriptionLowerCase,
      category,
      value,
      yearMonthDay,
    } = content;
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
    modalContent === "Post" ? handlePost() : handleUpdate();
  };

  const handlePost = async () => {
    try {
      const data = await post(content);
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
        const newTransactions = Object.assign([], transactions);
        newTransactions.push(postedTransaction);
        updatedTransactions(sortTransactions(newTransactions));
      }
      setMessage(`Salvo com sucesso!`);
      setColorMessage({ color: "green" });
      setContent({
        _id: "",
        type: "",
        description: "",
        descriptionLowerCase: "",
        category: "",
        value: 0,
        yearMonthDay: "",
      });
    } catch (error) {
      setMessage(`Erro ao salvar!`);
      setColorMessage({ color: "red" });
    }
  };

  const handleUpdate = async () => {
    try {
      await update(content);
      setMessage(`Salvo com sucesso!`);
      setColorMessage({ color: "green" });
      const arrayDate = content.yearMonthDay.split("-");
      const currentDate = `${arrayDate[0]}-${arrayDate[1]}`;
      if (currentDate === currentPeriod) {
        const index = transactions.findIndex((transaction) => {
          return transaction._id === content._id;
        });
        const newTransactions = Object.assign([], transactions);
        newTransactions[index] = content;
        updatedTransactions(sortTransactions(newTransactions));
        return;
      }
      const filteredTransactions = transactions.filter((transaction) => {
        return transaction._id !== content._id;
      });
      updatedTransactions(filteredTransactions);
    } catch (error) {
      setMessage(`Erro ao salvar!`);
      setColorMessage({ color: "red" });
    }
  };

  const sortTransactions = (transactions) => {
    const sortedTransactions = transactions.sort((a, b) => {
      return a.yearMonthDay.split("-")[2] - b.yearMonthDay.split("-")[2];
    });
    return sortedTransactions;
  };

  return (
    <div>
      <Modal isOpen={modalOpen} className={css.modal}>
        <div className={css.header}>
          <h3>Edição de Lançamento</h3>

          <button
            className={css.close}
            onClick={() => {
              setModalOpen(false);
              onEsc(null);
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
                style={modalContent.type === "-" ? { fontWeight: "bold" } : {}}
                style={modalContent === "Post" ? { cursor: "pointer" } : {}}
              >
                <input
                  className={
                    modalContent.type === "-"
                      ? `${css.radio} ${css.marked}`
                      : css.radio
                  }
                  style={modalContent === "Post" ? { cursor: "pointer" } : {}}
                  type="radio"
                  name="type"
                  disabled={modalContent === "Post" ? false : true}
                  onClick={() => {
                    setContent({
                      ...content,
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
                style={modalContent.type === "+" ? { fontWeight: "bold" } : {}}
                style={modalContent === "Post" ? { cursor: "pointer" } : {}}
              >
                <input
                  className={
                    modalContent.type === "+"
                      ? `${css.radio} ${css.marked}`
                      : css.radio
                  }
                  style={modalContent === "Post" ? { cursor: "pointer" } : {}}
                  type="radio"
                  name="type"
                  disabled={modalContent === "Post" ? false : true}
                  onClick={() => {
                    setContent({
                      ...content,
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
              value={content.description}
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
              value={content.category}
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
                value={content.value}
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
                value={content.yearMonthDay}
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
