const { createStore, combineReducers } = require('redux');

const initialState = {
  users: [],
  payments: [],
};

const ADD_USER = (users, payload) => {
    users = [...users, payload]
    return users;
  };
const ADD_PAYMENT = (users, payload) => {
  users[0] = {
    ...users[0],
    payments: [...users[0].payments, payload.amount]
  }
  return users;
};

const _usersActions = {ADD_USER, ADD_PAYMENT};

const userManagement = (users = [], action) =>
   _usersActions[action.type]?
          _usersActions[action.type](users, action.payload):
           users;



function paymentManagement(payments = [], action){
  if(action.type === "ADD_PAYMENT") {
    payments = [...payments, action.payload];
    return payments;
  }
  return payments;
}

const reducers = combineReducers({
  payments: paymentManagement,
  users: userManagement,
});

const store = createStore(reducers);

const addUser = {
  type: "ADD_USER",
  payload: {name: 'Yassine', payments: []}
};

const addPayment = {
  type: "ADD_PAYMENT",
  payload: {by: "Yassine" ,amount: 120}
};

store.subscribe(() => console.log(store.getState()))

store.dispatch(addUser);
store.dispatch(addPayment);

