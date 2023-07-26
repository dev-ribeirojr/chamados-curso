import './notfound.css';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function NotFound() {

  return (
    <section className='not'>
      <section className='container-not'>
        <header className='header-login not-found'>
          <h1>4</h1>
          <img src={Logo} alt='logo' />
          <h1>4</h1>
        </header>
        <section className='conent-not'>

          <p>Ops!! Página não encontrada</p>
          <Link to="/dashboard">
            Página Inicial
          </Link>
        </section>

      </section>
    </section>
  )
}