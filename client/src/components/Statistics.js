import React from "react";
import css from "./statistics.module.css";

export default function Stat({ transactions }) {
  let profit = 0;
  let expense = 0;
  transactions.forEach(({ type, value }) => {
    type === "+" ? (profit += value) : (expense += value);
  });
  let balance = profit - expense;

  const formatValue = (value) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const classBalance =
    balance > 0 ? { color: `darkturquoise` } : { color: `crimson` };

  return (
    <div className={css.flex}>
      <span className={css.statItem}>
        Lançamentos: <strong>{transactions.length}</strong>
      </span>
      <span className={css.statItem}>
        Receitas: <strong className={css.profit}>{formatValue(profit)}</strong>
      </span>
      <span className={css.statItem}>
        Despesas:{" "}
        <strong className={css.expense}>{formatValue(expense)}</strong>
      </span>
      <span className={css.statItem}>
        Saldo: <strong style={classBalance}>{formatValue(balance)}</strong>
      </span>
    </div>
  );
}
