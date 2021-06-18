import React, { useState } from 'react';
import css from './nav.module.css';

export default function Nav({ years, periodToSearch }) {
  const [periodSelected, setPeriodSelected] = useState('Jun/2021');

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const periods = [];
  years.forEach((year) => {
    months.forEach((month) => {
      periods.push(`${month}/${year}`);
    });
  });

  const handleSelectChange = (event) => {
    setPeriodSelected(event.target.value);
    searchPeriod(event.target.value);
  };

  const searchPeriod = (period) => {
    const arrayPeriod = period.split('/');
    let monthNumber =
      months.findIndex((month) => {
        return month === arrayPeriod[0];
      }) + 1;
    if (monthNumber.toString().length === 1) {
      monthNumber = `0${monthNumber}`;
    }
    periodToSearch(`${arrayPeriod[1]}-${monthNumber}`);
  };

  const handleClick = (event) => {
    let index = periods.findIndex((period) => {
      return period === periodSelected;
    });
    event.target.value === '+' ? index++ : index--;
    setPeriodSelected(periods[index]);
    searchPeriod(periods[index]);
  };

  return (
    <div className={css.flex}>
      <button
        className={`${css.button} ${css.leftButton}`}
        value={'-'}
        onClick={handleClick}
      >
        &lt;
      </button>

      <select
        className={css.select}
        //className={`browser-default`}
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
        value={'+'}
        onClick={handleClick}
      >
        &gt;
      </button>
    </div>
  );
}
