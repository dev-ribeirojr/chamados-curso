import { useState, useContext } from 'react';
import './new.css';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { AuthContext } from '../../contexts/auth';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function New() {

  const { customersExist, user, loadingCustomers } = useContext(AuthContext);

  const [chamado, setChamado] = useState({
    cliente: '',
    complemento: '',
    assunto: 'Suporte',
    status: 'Aberto'
  })

  function handleChange(prop, value) {
    setChamado({ ...chamado, [prop]: value.target.value })
  }

  return (
    <section >
      <Header />
      <section className="content">
        <Title titulo="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>
      </section>
      <section className='container'>
        <form className='form-perfil'>
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
                <option key={index} value={client.nomeFantasia}>{client.nomeFantasia}</option>
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