import {NavLink} from "react-router";

function App() {
  return (
      <div>
        Home Page

        <NavLink to={"/transactions"}>Transactions</NavLink>
      </div>
  )
}

export default App
