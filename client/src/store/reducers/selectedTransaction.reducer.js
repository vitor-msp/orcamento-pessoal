export const selectedTransactionReducer = (
  state = null,
  action
) => {
  switch (action.type) {
    case "changeSelectedTransaction":
      return action.payload;

    default:
      return state;
  }
};