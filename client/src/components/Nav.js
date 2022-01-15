import React, { useState } from "react";
import css from "./nav.module.css";
import { defaultPeriod } from "../store/defaultPeriod";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPeriod } from "../store/actions/currentPeriod.actions";

export default function Nav() {
  const [periodSelected, setPeriodSelected] = useState(defaultPeriod.text);
  const distinctYears = useSelector((state) => state.distinctYears);
  const dispatch = useDispatch();

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const periods = [];
  distinctYears.forEach((year) => {
    months.forEach((month) => {
      periods.push(`${month}/${year}`);
    });
  });

  const handleSelectChange = (event) => {
    setPeriodSelected(event.target.value);
    dispatch(changeCurrentPeriod(periodFromTextToNumber(event.target.value)));
  };

  const handleClick = (event) => {
    let index = periods.findIndex((period) => {
      return period === periodSelected;
    });
    event.target.value === "+" ? index++ : index--;
    setPeriodSelected(periods[index]);
    dispatch(changeCurrentPeriod(periodFromTextToNumber(periods[index])));
  };

  const periodFromTextToNumber = (period) => {
    const arrayPeriod = period.split("/");
    let monthNumber =
      months.findIndex((month) => {
        return month === arrayPeriod[0];
      }) + 1;
    if (monthNumber.toString().length === 1) {
      monthNumber = `0${monthNumber}`;
    }
    return `${arrayPeriod[1]}-${monthNumber}`;
  };

  return (
    <div className={css.flex}>
      <button
        className={`${css.button} ${css.leftButton}`}
        value={"-"}
        onClick={handleClick}
      >
        &lt;
      </button>

      <select
        className={css.select}
        value={periodSelected}
        onChange={handleSelectChange}
      >
        {periods.map((period) => {
          return (
            <option key={period} value={period}>
              {period}
            </option>
          );
        })}
      </select>

      <button
        className={`${css.button} ${css.rightButton}`}
        value={"+"}
        onClick={handleClick}
      >
        &gt;
      </button>
    </div>
  );
}
