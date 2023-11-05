const firstState = {
  logined: JSON.parse(localStorage.getItem("entry__data")),
};

const loginReducers = (state = firstState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        logined: true,
      };
    case "LOGOUT":
      return {
        logined: false,
      };
    default:
      return state;
  }
};

export default loginReducers;
