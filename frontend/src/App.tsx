import {NavLink} from "react-router";

function App() {
  return (
      <div>
        Home Page
          <img src="/logo.png" alt="Logo" className={"bg-contain"}/>
        <NavLink to={"/transactions"}>Transactions</NavLink>
      </div>
  )
}

export default App
