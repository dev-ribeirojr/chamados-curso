import { useState, useContext } from 'react';
import './signin.css';

import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

  const [dadosLogin, setDadosLogin] = useState({
    email: '',
    password: ''
  })

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(e) {
    e.preventDefault();
    if (dadosLogin.email !== '' && dadosLogin.password !== '') {

      await signIn(dadosLogin.email, dadosLogin.password);

      setDadosLogin({ email: '', password: '' });
    } else {
      alert('preencha os campos');
    }
  }

  function atualizarInput(prop, e) {
    setDadosLogin({ ...dadosLogin, [prop]: e.target.value })
  }

  return (
    <section className="container-center">
      <section className='login'>
        <header className='header-login'>
          <img src={Logo} alt='logo' />
        </header>
        <form className='form-login' onSubmit={handleSignIn}>
          <h1>Logar</h1>
          <input
            type='text'
            placeholder='email@email.com'
            value={dadosLogin.email}
            onChange={(e) => atualizarInput('email', e)}
          />
          <input
            type='password'
            placeholder='******'
            value={dadosLogin.password}
            onChange={(e) => atualizarInput('password', e)}
            autoComplete='on'
          />
          <button type='submit'>{
            loadingAuth ? 'Entrando...' : 'Entrar'
          }</button>

        </form>
        <Link to='/register'>Cadastre-se</Link>
      </section>
    </section>
  )
}