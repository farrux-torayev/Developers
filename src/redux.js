export const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 10 };
    case "DECREMENT":
      return { count: state.count - 10 };
    default:
      return state;
  }
};
