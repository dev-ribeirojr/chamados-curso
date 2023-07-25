import { useState, useContext } from 'react';
import './customers.css';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { db } from '../../services/firebaseConection';
import { addDoc, collection } from 'firebase/firestore';
import { FiUser } from 'react-icons/fi';

import { AuthContext } from '../../contexts/auth';

export default function Customers() {

  const [empresa, setEmpresa] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
  })

  const { customersExist } = useContext(AuthContext);

  async function handleRegister(e) {
    e.preventDefault();
    if (empresa.nome !== '' && empresa.cnpj !== '' && empresa.endereco !== '') {

      const exist = customersExist.findIndex((customers) => customers.cnpj === empresa.cnpj)

      if (exist !== -1) {
        alert('Este CNPJ já está cadastrado em nosso banco de dados')
        setEmpresa({ nome: '', cnpj: '', endereco: '' })
        return;
      }

      await addDoc(collection(db, 'customers'), {
        nomeFantasia: empresa.nome.toLocaleUpperCase(),
        cnpj: empresa.cnpj,
        endereco: empresa.endereco
      })
        .then(() => {
          setEmpresa({
            nome: '', cnpj: '', endereco: ''
          })
          alert('cadastro feito com sucesso!');
        })
        .catch((error) => {
          console.log(error)
          alert('Erro ao cadastrar!');
        })
    }
  }

  function handleChange(prop, value) {
    setEmpresa({ ...empresa, [prop]: value.target.value })
  }

  return (
    <section>
      <Header />
      <section className='content'>
        <Title titulo="Clientes">
          <FiUser size={25} />
        </Title>
      </section>
      <section className='container'>
        <form className='form-perfil' onSubmit={handleRegister}>
          <label>Nome fantasia</label>
          <input
            type='text'
            placeholder='Nome da empresa'
            value={empresa.nome}
            onChange={(e) => handleChange('nome', e)}
          />
          <label>CNPJ</label>
          <input
            type='text'
            placeholder='Digite o CNPJ'
            value={empresa.cnpj}
            onChange={(e) => handleChange("cnpj", e)}
          />
          <label>Endereço</label>
          <input
            type='text'
            placeholder='Edereço da empresa'
            value={empresa.endereco}
            onChange={(e) => handleChange('endereco', e)}
          />

          <button type='submit'>Cadastrar</button>
        </form>
      </section>
    </section>
  )
}