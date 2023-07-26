import { useState, useContext, useEffect } from 'react';
import './new.css';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { AuthContext } from '../../contexts/auth';
import { FiPlusCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { db } from '../../services/firebaseConection';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import { useParams } from 'react-router-dom';

export default function New() {

  const { customersExist, user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false)

  const { id } = useParams();
  const navigate = useNavigate();

  const [chamado, setChamado] = useState({
    cliente: 0,
    complemento: '',
    assunto: 'Suporte',
    status: 'Aberto'
  })

  useEffect(() => {
    function handleId() {
      if (id) {
        loadId();
      }
    }
    handleId()

  }, [])

  async function loadId() {
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
      .then((snapshot) => {
        let index = customersExist.findIndex(item => item.id === snapshot.data().clienteId);

        setChamado({
          ...chamado,
          cliente: index,
          assunto: snapshot.data().assunto,
          status: snapshot.data().status,
          complemento: snapshot.data().complemento,
        })
        setEdit(true)
      })
      .catch((error) => {
        console.log(error)
        alert('Chamado não existe')
      })
  }

  function handleChange(prop, value) {
    setChamado({ ...chamado, [prop]: value.target.value })
  }

  async function handleTask(e) {
    e.preventDefault();

    if (edit) {

      const docRef = doc(db, "chamados", id);
      await updateDoc(docRef, {
        cliente: customersExist[chamado.cliente].nomeFantasia,
        clienteId: customersExist[chamado.cliente].id,
        assunto: chamado.assunto,
        complemento: chamado.complemento,
        status: chamado.status,
        userId: user.uid,
      })
        .then(() => {
          alert('Chamado atualizado com sucesso!')
          setChamado({
            cliente: 0,
            complemento: '',
            assunto: 'Suporte',
            status: 'Aberto'
          })
          setEdit(false)
          navigate('/dashboard')
        })

      return;
    }

    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: customersExist[chamado.cliente].nomeFantasia,
      clienteId: customersExist[chamado.cliente].id,
      assunto: chamado.assunto,
      complemento: chamado.complemento,
      status: chamado.status,
      userId: user.uid,
    })
      .then(() => {
        alert('Chamado registrado!')
        setChamado({
          cliente: 0,
          complemento: '',
          assunto: 'Suporte',
          status: 'Aberto'
        })
      })
      .catch((error) => {
        console.log(error)
        setEdit(false)
      })
  }

  return (
    <section >
      <Header />
      <section className="content">
        <Title titulo={id ? "Editando Chamado" : "Novo Chamado"}>
          <FiPlusCircle size={25} />
        </Title>
      </section>
      <section className='container'>
        <form className='form-perfil' onSubmit={handleTask}>
          <label>Clientes</label>
          {customersExist.length === 0 ?
            <section className='area-clientes-zero'>
              <input
                type='text'
                disabled={true}
                value="Não existe cliente cadastrado"
              />
              <Link to="/customers">
                Cadastrar Primeiro Cliente
              </Link>
            </section>
            :
            <select value={chamado.cliente} onChange={(e) => handleChange('cliente', e)}>
              {customersExist.map((client, index) => (
                <option key={index} value={index}>{client.nomeFantasia}</option>
              ))}
            </select>
          }

          <label>Assunto</label>
          <select value={chamado.assunto} onChange={(e) => handleChange('assunto', e)}>
            <option value="Suporte" >Suporte</option>
            <option value="Visita Tecnica" >Visita Tecnica</option>
            <option value="Financeiro" >Financeiro</option>
          </select>

          <label>Status</label>
          <section className='status'>
            <input
              type='radio'
              name='radio'
              value="Aberto"
              onChange={(e) => handleChange('status', e)}
              checked={chamado.status === 'Aberto'}
            />
            <span>Em Aberto</span>
            <input
              type='radio'
              name='radio'
              value="Progresso"
              onChange={(e) => handleChange('status', e)}
              checked={chamado.status === 'Progresso'}
            />
            <span>Progresso</span>
            <input
              type='radio'
              name='radio'
              value="Finalizado"
              onChange={(e) => handleChange('status', e)}
              checked={chamado.status === 'Finalizado'}
            />
            <span>Finalizado</span>
          </section>

          <label>Complemento</label>
          <textarea
            type="text"
            placeholder='Descreva seu problema (opcional)'
            value={chamado.complemento}
            onChange={(e) => handleChange('complemento', e)}
          />
          <button type='submit'>Registrar</button>
        </form>
      </section>

    </section>
  )
}