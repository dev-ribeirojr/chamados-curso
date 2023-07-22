import { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
  const inputRef = useRef();
  const [dadosCadastro, setDadosCadastro] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { signUp, loading } = useContext(AuthContext);

  useEffect(() => {
    function darFocoInputt() {
      inputRef.current.focus();
    }
    darFocoInputt();
  }, []) 

  async function cadastrar(e) {
    e.preventDefault();
    if (dadosCadastro.name !== '' && dadosCadastro.email !== '' && dadosCadastro.password !== '') {

      await signUp(dadosCadastro.name, dadosCadastro.email, dadosCadastro.password);
      setDadosCadastro({ name: '', email: '', password: '' });

    } else {
      alert('preencha todos os dados');
    }
  }

  function atualizarInput(prop, value) {
    setDadosCadastro({ ...dadosCadastro, [prop]: value.target.value })
  }

  return (
    <section className="container-center">
      <section className='login'>
        <header className='header-login'>
          <img src={Logo} alt='logo' />
        </header>
        <form className='form-login' onSubmit={cadastrar}>
          <h1>Cadastrar</h1>
          <input
            type='text'
            placeholder='Nome'
            value={dadosCadastro.name}
            onChange={(e) => atualizarInput('name', e)}
            ref={inputRef}
          />
          <input
            type='text'
            placeholder='email@email.com'
            value={dadosCadastro.email}
            onChange={(e) => atualizarInput('email', e)}
          />
          <input
            type='password'
            placeholder='******'
            value={dadosCadastro.password}
            onChange={(e) => atualizarInput('password', e)}
          />
          <button type='submit'>
            {loading ? 'Carregando...' : 'Cadastrar'
            }
          </button>

        </form>
        <Link to='/'>Já possui uma conta? Faça login</Link>
      </section>
    </section>
  )
}