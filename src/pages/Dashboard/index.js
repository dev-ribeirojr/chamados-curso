import { useContext, useEffect, useState } from "react";
import './dashboard.css';

import { AuthContext } from "../../contexts/auth";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Title from "../../components/Title";

import { db } from "../../services/firebaseConection";
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";

import { format } from "date-fns";

const listRef = collection(db, "chamados");

export default function Dashboard() {

  const { logout } = useContext(AuthContext);
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const [lastDoc, setLastDoc] = useState();
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function loadChamados() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);

      setChamados([]);
      await updateState(querySnapshot);
      setLoading(false);
    }
    loadChamados();

    return () => { }
  }, [])

  async function handleMore() {
    setLoadingMore(true);
    const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDoc), limit(5));
    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
  }

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;
    if (!isCollectionEmpty) {
      let lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          complemento: doc.data().complemento,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyy'),
          status: doc.data().status,
          userId: doc.data().userId
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] //ultimo item

      setChamados(chamados => [...chamados, ...lista]);
      setLastDoc(lastDoc);

    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);
  }

  async function handleLogout() {
    await logout();
  }

  if (loading) {
    return (
      <section>
        <Header />
        <section className="content">
          <Title titulo='Chamados'>
            <FiMessageSquare size={25} />
          </Title>
        </section>
        <section className="container dash">
          <span>Buscando chamados...</span>
        </section>
      </section>
    )
  }

  return (
    <section className="dashboard" >
      <Header />
      <section className="content">
        <Title titulo='Chamados'>
          <FiMessageSquare size={25} />
        </Title>
      </section>
      {
        chamados.length === 0 ? (
          <section className="container dash">
            <span>Nenhum chamado encontrado...</span>
            <section className="new">
              <Link to='/new' >
                <FiPlus color="#FFF" size={25} />
                Novo Chamado
              </Link>
            </section>
          </section>
        ) :
          (
            <>
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
                  {chamados.map((chamado, index) => (
                    <tr key={index}>
                      <td data-label='Cliente'>{chamado.cliente}</td>
                      <td data-label='Assunto'>{chamado.assunto}</td>
                      <td data-label='Status'>
                        <span
                          className="badge"
                          style={{ backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : '#999' }}
                        >
                          {chamado.status}
                        </span>
                      </td>
                      <td data-label='Cadastrado'>{chamado.createdFormat}</td>
                      <td data-label='#'>
                        <button
                          className="action"
                          style={{ backgroundColor: '#3583f6' }}
                        >
                          <FiSearch
                            color="#FFF" size={17}
                          />
                        </button>
                        <Link
                          to={`/new/${chamado.id}`}
                          className="action"
                          style={{ backgroundColor: '#f6a935' }}
                        >
                          <FiEdit2 color="#FFF" size={17} />

                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <section className="content dash">
                {loadingMore && <h3>Buscando mais chamados...</h3>}
                {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar Mais</button>}
              </section>
            </>
          )
      }
    </section>
  )
}