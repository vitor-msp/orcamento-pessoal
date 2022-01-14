import { defaultPeriod } from "../defaultPeriod";

export const currentPeriodReducer = (
  state = defaultPeriod.number,
  action
) => {
  switch (action.type) {
    case "changeCurrentPeriod":
      return action.payload;

    default:
      return state;
  }
};
