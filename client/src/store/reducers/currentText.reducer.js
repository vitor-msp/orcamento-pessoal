export const currentTextReducer = (
  state = '',
  action
) => {
  switch (action.type) {
    case "changeCurrentText":
      return action.payload;

    default:
      return state;
  }
};
