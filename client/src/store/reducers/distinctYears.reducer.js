export const distinctYearsReducer = (
  state = [],
  action
) => {
  switch (action.type) {
    case "updateDistinctYears":
      return action.payload;

    default:
      return state;
  }
};