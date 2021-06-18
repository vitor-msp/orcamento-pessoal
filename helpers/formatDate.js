const formatDate = (dateToFormat) => {
  const dateArray = dateToFormat.split('-');

  const day = dateArray[2].length === 2 ? dateArray[2] : `0${dateArray[2]}`;

  const month = dateArray[1].length === 2 ? dateArray[1] : `0${dateArray[1]}`;

  const year = dateArray[0].length === 4 ? dateArray[0] : `20${dateArray[0]}`;

  const yearMonth = [year, month].join('-');
  const yearMonthDay = [year, month, day].join('-');
  return { year, month, day, yearMonth, yearMonthDay };
};
export { formatDate };
