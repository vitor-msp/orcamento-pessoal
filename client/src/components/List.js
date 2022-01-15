import React from "react";
import Button from "./Button.js";
import css from "./list.module.css";

export default function List({
  transactions,
}) {

  return (
    <div className={css.flex}>
      <ul className={css.ul}>
        {transactions.map((transaction) => {
          const { _id, description, category, type, value, yearMonthDay } =
            transaction;
          const formatedValue = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          });
          const day = yearMonthDay.split("-")[2];
          const classLi =
            type === "+"
              ? { backgroundColor: `rgba(0, 206, 209, 0.4)` }
              : { backgroundColor: `rgba(220, 20, 60, 0.45)` };
          return (
            <li key={_id} className={css.li} style={classLi}>
              <div className={css.divLeft}>
                <span className={css.day}>{day}</span>
                <span className={css.text}>
                  <span className={css.category}>{category}</span>
                  <span className={css.description}>{description}</span>
                </span>
              </div>

              <div className={css.divRight}>
                <span className={css.value}>{formatedValue}</span>
                <div className={css.buttons}>
                  <Button
                    type={"edit"}
                    transaction={transaction}
                  />
                  <Button
                    type={"delete"}
                    transaction={transaction}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
