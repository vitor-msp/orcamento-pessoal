export const isModalOpenReducer = (
  state = false,
  action
) => {
  switch (action.type) {
    case "toggleModal":
      return action.payload;

    default:
      return state;
  }
};