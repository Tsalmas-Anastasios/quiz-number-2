import DataForm from "./DataForm.jsx";
import FilterForm from "./FilterForm.jsx";
import UsersDisplay from "./UsersDiplay.jsx";
import { useState, useEffect } from "react";
import './App.css'

export default function App() {
  const [users, setUsers] = useState([]);
  async function fetchData() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Sorry something went wrong");
      }
      // read response body as json
      const data = await response.json();
      setUsers(data);
    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <header className="box">
        <h1>CRUD Application</h1>
      </header>
      <main>
        <aside className="box">
          <DataForm setUsers={setUsers} users={users} />
        </aside>
        <div className="main-container">
          <FilterForm setUsers={setUsers} users={users} />
          <UsersDisplay users={users} />
        </div>
      </main>
      <footer className="box">created with 🖤❤️‍️ and hard work</footer>
    </>
  )
}