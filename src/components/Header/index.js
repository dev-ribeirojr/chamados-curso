import { useContext } from 'react';
import './header.css';
import avatarImg from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Header() {

  const { user, logout } = useContext(AuthContext);

  return (
    <header className="sidebar">
      <section className='area-perfil'>
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="imagen perfil" />
        <h1>{user.nome}</h1>
      </section>
      <nav className='navegacao'>
        <Link to='/dashboard'>
          <FiHome color='#FFF' size={24} />
          Chamados
        </Link>
        <Link to='/customers'>
          <FiUser color='#FFF' size={24} />
          Clientes
        </Link>
        <Link to='/profile'>
          <FiSettings color='#FFF' size={24} />
          Perfil
        </Link>
        <button className='header-btn-sair' onClick={() => logout()}>
          <FiLogOut color='#FFF' size={24} />
          Sair
        </button>
      </nav>
    </header>
  )
}