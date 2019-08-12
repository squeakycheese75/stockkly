export default function transactionReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_TRANSACTION":
      return [...state, { ...action.transaction }];
    default:
      return state;
  }
}
