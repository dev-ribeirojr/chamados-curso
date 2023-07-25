import { useContext } from "react";
import './dashboard.css';

import { AuthContext } from "../../contexts/auth";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Title from "../../components/Title";

export default function Dashboard() {

  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }

  return (
    <section className="dashboard" >
      <Header />
      <section className="content">
        <Title titulo='Chamados'>
          <FiMessageSquare size={25} />
        </Title>
      </section>
      <section className="new">
        <Link to='/new' >
          <FiPlus color="#FFF" size={25} />
          Novo Chamado
        </Link>
      </section>
      <table>
        <thead>
          <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Asunto</th>
            <th scope="col">Status</th>
            <th scope="col">Cadastrando em</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label='Cliente'>Mercado</td>
            <td data-label='Assunto'>Suporte</td>
            <td data-label='Status'>
              <span
                className="badge"
                style={{ backgroundColor: '#999' }}
              >
                Em Aberto
              </span>
            </td>
            <td data-label='Cadastrado'>12/05/2023</td>
            <td data-label='#'>
              <button
                className="action"
                style={{ backgroundColor: '#3583f6' }}
              >
                <FiSearch
                  color="#FFF" size={17}


                />
              </button>
              <button
                className="action"
                style={{ backgroundColor: '#f6a935' }}
              >
                <FiEdit2 color="#FFF" size={17} />

              </button>
            </td>
          </tr>



          <tr>
            <td data-label='Cliente'>Mercado</td>
            <td data-label='Assunto'>Suporte</td>
            <td data-label='Status'>
              <span
                className="badge"
                style={{ backgroundColor: '#999' }}
              >
                Em Aberto
              </span>
            </td>
            <td data-label='Cadastrado'>12/05/2023</td>
            <td data-label='#'>
              <button
                className="action"
                style={{ backgroundColor: '#3583f6' }}
              >
                <FiSearch
                  color="#FFF" size={17}


                />
              </button>
              <button
                className="action"
                style={{ backgroundColor: '#f6a935' }}
              >
                <FiEdit2 color="#FFF" size={17} />

              </button>
            </td>
          </tr>
          <tr>
            <td data-label='Cliente'>Mercado</td>
            <td data-label='Assunto'>Suporte</td>
            <td data-label='Status'>
              <span
                className="badge"
                style={{ backgroundColor: '#999' }}
              >
                Em Aberto
              </span>
            </td>
            <td data-label='Cadastrado'>12/05/2023</td>
            <td data-label='#'>
              <button
                className="action"
                style={{ backgroundColor: '#3583f6' }}
              >
                <FiSearch
                  color="#FFF" size={17}


                />
              </button>
              <button
                className="action"
                style={{ backgroundColor: '#f6a935' }}
              >
                <FiEdit2 color="#FFF" size={17} />

              </button>
            </td>
          </tr>



        </tbody>
      </table>

    </section>
  )
}