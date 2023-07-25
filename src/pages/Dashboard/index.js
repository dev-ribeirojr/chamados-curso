import { useContext } from "react";
import './dashboard.css';
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

export default function Dashboard() {

  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }

  return (
    <section className="dashboard" >
      <Header />
      <section className="content">
        <button onClick={handleLogout}>
          Sair Da conta
        </button>
      </section>
    </section>
  )
}