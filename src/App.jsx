import { useReducer } from "react";
import "./index.css";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      if (state.isActive) return state;
      return {
        balance: 500,
        loan: 0,
        isActive: true,
      };
    case "requestLoan":
      if (state.isActive && state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
      };
    case "payLoan":
      if (state.isActive && state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    case "deposite":
      if (!state.isActive) return state;
      return {
        ...state,
        balance: state.balance + 150,
      };
    case "withdraw":
      if (!state.isActive) return state;
      if (state.balance < 50) return state;
      return {
        ...state,
        balance: state.balance - 50,
      };
    case "closeAccount":
      return {
        balance: 0,
        loan: 0,
        isActive: false,
      };
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <button className="box" onClick={() => dispatch({ type: "openAccount" })}>
        <div className="text">Open account</div>
      </button>

      <div className="box">
        <img className={!isActive ? "disabled" : ""} src="assets/balance.png" />
        <div className="overlay"></div>
        <div className="text">Balance: {balance}</div>
      </div>

      <div className="box">
        <img
          className={!isActive ? "disabled" : ""}
          src="assets/loan-balance.png"
          alt=""
        />
        <div className="overlay"></div>
        <div className="text">Loan: {loan}</div>
      </div>

      <button
        className="box"
        disabled={!isActive}
        onClick={() => dispatch({ type: "requestLoan" })}
      >
        <img
          className={!isActive ? "disabled" : ""}
          src="assets/request-loan.png"
          alt=""
        />
        <div className="overlay"></div>
        <div className="text">
          Request a loan <br /> of 5000
        </div>
      </button>

      <button
        className="box"
        disabled={!isActive}
        onClick={() => dispatch({ type: "deposite" })}
      >
        <img
          className={!isActive ? "disabled" : ""}
          src="assets/deposite.png"
          alt=""
        />
        <div className="overlay"></div>
        <div className="text">Deposit 150</div>
      </button>

      <button
        className="box"
        disabled={!isActive}
        onClick={() => dispatch({ type: "withdraw" })}
      >
        <img
          className={!isActive ? "disabled" : ""}
          src="assets/withdraw.png"
          alt=""
        />
        <div className="overlay"></div>
        <div className="text">Withdraw 50</div>
      </button>

      <button
        className="box"
        disabled={!isActive}
        onClick={() => dispatch({ type: "payLoan" })}
      >
        <img
          className={!isActive ? "disabled" : ""}
          src="assets/pay-loan.png"
          alt=""
        />
        <div className="overlay"></div>
        <div className="text">Pay loan</div>
      </button>
      <button
        className="box"
        disabled={!isActive}
        onClick={() => dispatch({ type: "closeAccount" })}
      >
        <div className="text">Close account</div>
      </button>
    </div>
  );
}
